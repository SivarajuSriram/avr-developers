"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type MapPoint = {
  place: string;
  time: string;
  lat: number;
  lng: number;
  category?: string;
  image?: string;
};

const CATEGORY_ICON: Record<string, string> = {
  Commercial: "/icons/location/commercial-1.png",
  Healthcare: "/icons/location/healthcare.png",
  Connectivity: "/icons/location/connectivity.png",
  Education: "/icons/location/education.png",
  "Recreation & Lifestyle": "/icons/location/lifestyle.png",
};

function createPinIcon(isProject: boolean, iconUrl?: string, projectLogo = "/logo-light.png") {
  if (isProject) {
    return L.divIcon({
      className: "marker-container project-pin",
      html: `<div class="pin-svg project-img-pin">
               <img src="${projectLogo}" alt="" class="project-pin-logo">
               <div class="pin-tail"></div>
             </div>`,
      iconSize: [34, 40],
      iconAnchor: [17, 40],
    });
  }
  return L.divIcon({
    className: "marker-container",
    html: `<div class="pin-svg cat-img-pin">
             <img src="${iconUrl}" alt="">
             <div class="pin-tail"></div>
           </div>`,
    iconSize: [34, 40],
    iconAnchor: [17, 40],
  });
}

/**
 * Leaflet + free CartoDB Voyager raster tiles (no API key/billing). Raster
 * tiles are plain images, so there's no vector-style/glyph readiness pipeline
 * to stall on — kept as its own module so it can be next/dynamic-imported
 * with ssr:false and only mounted once the location section nears the
 * viewport, the map JS/CSS never ships in the main bundle.
 */
export function LocationMapCanvas({
  projectName,
  projectImage,
  projectLogo,
  center,
  points,
  activeIndex,
}: {
  projectName: string;
  projectImage?: string;
  projectLogo?: string;
  center: { lat: number; lng: number };
  points: MapPoint[];
  activeIndex: number | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const projectMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center: [center.lat, center.lng],
      zoom: 13,
      zoomSnap: 0.5,
      scrollWheelZoom: false,
      attributionControl: false,
      zoomControl: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap contributors &copy; CARTO",
      maxZoom: 20,
    }).addTo(map);

    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    /* the container's real size isn't committed yet on first paint (it mounts via
       next/dynamic inside a lazily-revealed section) — invalidateSize once the
       container settles so Leaflet doesn't cache a 0x0 measurement. */
    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(containerRef.current);

    const projectMarker = L.marker([center.lat, center.lng], {
      icon: createPinIcon(true, undefined, projectLogo),
      zIndexOffset: 1000,
    }).addTo(map);
    projectMarkerRef.current = projectMarker;

    if (projectImage) {
      projectMarker.bindTooltip(
        `<div class="tooltip-inner-custom"><img src="${projectImage}" class="tooltip-img" alt="${projectName}"></div>`,
        { className: "custom-tooltip", direction: "auto", offset: [0, -50] },
      );
    }

    projectMarker.on("mouseover", () => {
      projectMarker.getElement()?.classList.add("iris-hovered");
    });
    projectMarker.on("mouseout", () => {
      projectMarker.getElement()?.classList.remove("iris-hovered");
    });

    markersRef.current = points.map((p, i) => {
      const tooltipHtml = p.image
        ? `<div class="tooltip-inner-custom"><img src="${p.image}" class="tooltip-img" alt="${p.place}"></div>`
        : `<div class="tooltip-inner-custom tooltip-inner-custom--text">${p.place}</div>`;

      const marker = L.marker([p.lat, p.lng], { icon: createPinIcon(false, CATEGORY_ICON[p.category ?? ""]) })
        .addTo(map)
        .bindTooltip(tooltipHtml, { className: "custom-tooltip", direction: "auto", offset: [0, -50] });

      marker.on("mouseover", () => {
        marker.getElement()?.classList.add("hovered");
        projectMarker.getElement()?.classList.add("dimmed");
      });
      marker.on("mouseout", () => {
        marker.getElement()?.classList.remove("hovered");
        projectMarker.getElement()?.classList.remove("dimmed");
      });
      marker.on("click", () => {
        const card = carouselRef.current?.querySelector(`[data-id="${i}"]`);
        card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      });

      return marker;
    });

    return () => {
      resizeObserver.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
      projectMarkerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* list-hover sync (desktop) */
  useEffect(() => {
    markersRef.current.forEach((marker, i) => {
      const el = marker.getElement();
      el?.classList.toggle("hovered", i === activeIndex);
      if (i === activeIndex) marker.openTooltip();
      else marker.closeTooltip();
    });
    projectMarkerRef.current?.getElement()?.classList.toggle("dimmed", activeIndex !== null);

    const map = mapRef.current;
    if (!map) return;
    const target = activeIndex !== null ? points[activeIndex] : null;
    map.panTo(target ? [target.lat, target.lng] : [center.lat, center.lng], { animate: true, duration: 0.5 });
  }, [activeIndex, points, center]);

  /* mobile carousel: scroll position drives which pin is highlighted + panned to */
  useEffect(() => {
    const carousel = carouselRef.current;
    const map = mapRef.current;
    if (!carousel || !map) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            const id = entry.target.getAttribute("data-id");
            const target = id === "project" ? { lat: center.lat, lng: center.lng } : points[Number(id)];
            if (!target) return;
            map.panTo([target.lat, target.lng], { animate: true, duration: 0.5 });
            document
              .querySelectorAll(".marker-container")
              .forEach((el) => el.classList.remove("hovered", "iris-hovered"));
            const marker = id === "project" ? projectMarkerRef.current : markersRef.current[Number(id)];
            marker?.getElement()?.classList.add(id === "project" ? "iris-hovered" : "hovered");
          }
        });
      },
      { root: carousel, threshold: 0.6 },
    );

    carousel.querySelectorAll(".carousel-item-card").forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [points, center]);

  /* mouse drag-to-scroll for the mobile carousel — touch already scrolls
     natively via overflow-x + scroll-snap, this just adds the same feel
     for a trackpad/mouse click-drag. A moved-flag suppresses the click
     that would otherwise fire scrollIntoView after a drag. */
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-dragging");
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      el.scrollLeft = startScroll - dx;
    };
    const endDrag = () => {
      dragging = false;
      el.classList.remove("is-dragging");
    };
    const onClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.stopPropagation();
        e.preventDefault();
        moved = false;
      }
    };

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);
    el.addEventListener("click", onClickCapture, true);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
      el.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="map-leaflet-container h-full w-full" />
      <div ref={carouselRef} className="mobile-image-carousel">
        <div
          className="carousel-item-card"
          data-id="project"
          onClick={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })}
        >
          {projectImage && (
            <div className="carousel-img-wrap">
              <Image
                src={projectImage}
                alt={projectName}
                fill
                sizes="70vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          )}
          <div className="carousel-item-title">{projectName}</div>
        </div>
        {points.map((p, i) => (
          <div
            key={p.place}
            className="carousel-item-card"
            data-id={i}
            onClick={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })}
          >
            {p.image && (
              <div className="carousel-img-wrap">
                <Image
                  src={p.image}
                  alt={p.place}
                  fill
                  sizes="70vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            )}
            <div className="carousel-item-title">{p.place}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

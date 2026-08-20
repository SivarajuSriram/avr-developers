"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import L from "leaflet";

type MapPoint = {
  place: string;
  time: string;
  lat: number;
  lng: number;
  category?: string;
  image?: string;
};

/**
 * lifestyle.png (a person ringed by a book/music-note/play-button, drawn for
 * the old "Recreation & Lifestyle" category) was being reused as-is for
 * Supermarkets, Entertainment, and Hospitality, none of which it actually
 * depicts, so those pins all showed the same not-quite-anything icon on
 * hover. These three are small hand-drawn SVGs (same stroke style/weight as
 * the PNG set) instead, encoded as data URIs so they can still be plain
 * <img src> like the rest and pick up the existing .cat-img-pin img sizing.
 */
const svgIcon = (paths: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#17233b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`,
  )}`;

const ICON_BRIEFCASE = svgIcon(
  '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/>',
);
const ICON_CART = svgIcon(
  '<circle cx="9" cy="20" r="1.3"/><circle cx="18" cy="20" r="1.3"/><path d="M2 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6"/>',
);
const ICON_CLAPPERBOARD = svgIcon(
  '<path d="M3 8.5 4.5 5h15L21 8.5"/><path d="M3 8.5h18V19a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8.5z"/><path d="m7 5 2 3.5M12 5l2 3.5M17 5l2 3.5"/>',
);
const ICON_BED = svgIcon(
  '<path d="M2 18v-6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v6"/><path d="M2 18v2M22 18v2"/><path d="M2 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
);

const CATEGORY_ICON: Record<string, string> = {
  Commercial: ICON_BRIEFCASE,
  Healthcare: "/icons/location/healthcare.png",
  Connectivity: "/icons/location/connectivity.png",
  Education: "/icons/location/education.png",
  "Recreation & Lifestyle": "/icons/location/lifestyle.png",
  "Commercial & IT Hubs": ICON_BRIEFCASE,
  "Educational Institutes": "/icons/location/education.png",
  Hospitals: "/icons/location/healthcare.png",
  "Schools / Colleges": "/icons/location/education.png",
  "IT / ITES": ICON_BRIEFCASE,
  Supermarkets: ICON_CART,
  "IT SEZ": ICON_BRIEFCASE,
  Entertainment: ICON_CLAPPERBOARD,
  Hospitality: ICON_BED,
};

function createPinIcon(
  isProject: boolean,
  iconUrl?: string,
  projectLogo = "/logo-light.png",
  label = "",
) {
  if (isProject) {
    return L.divIcon({
      className: "marker-container project-pin",
      html: `<div class="pin-svg project-img-pin">
               <img src="${projectLogo}" alt="${label}" title="${label}" class="project-pin-logo">
               <div class="pin-tail"></div>
             </div>`,
      iconSize: [34, 40],
      iconAnchor: [17, 40],
    });
  }
  return L.divIcon({
    className: "marker-container",
    html: `<div class="pin-svg cat-img-pin">
             <img src="${iconUrl}" alt="${label}" title="${label}">
             <div class="pin-tail"></div>
           </div>`,
    iconSize: [34, 40],
    iconAnchor: [17, 40],
  });
}

/**
 * Leaflet + free CartoDB Voyager raster tiles (no API key/billing). Raster
 * tiles are plain images, so there's no vector-style/glyph readiness pipeline
 * to stall on. Kept as its own module so it can be next/dynamic-imported
 * with ssr:false and only mounted once the location section nears the
 * viewport, the map JS/CSS never ships in the main bundle.
 */
export function LocationMapCanvas({
  projectName,
  projectLogo,
  center,
  points,
  activeIndex,
}: {
  projectName: string;
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

  // Loaded lazily (not as a top-level `import "leaflet/dist/leaflet.css"`) so
  // Turbopack doesn't hoist this 68KB stylesheet into the render-blocking
  // <head> of every page — this component is the only thing that needs it,
  // and it's already loaded via next/dynamic for JS code-splitting; CSS
  // deferral doesn't follow that automatically, so it has to be done here.
  useEffect(() => {
    import("leaflet/dist/leaflet.css");
  }, []);

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

    /* Esri World Imagery (satellite) + its reference-labels overlay, stacked to
       match the "hybrid" look (imagery + place/road labels), same free,
       no-API-key tier as the CartoDB tiles this replaced. */
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles &copy; Esri", maxZoom: 19 },
    ).addTo(map);
    L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
      { attribution: "Tiles &copy; Esri", maxZoom: 19 },
    ).addTo(map);

    L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);
    L.control.zoom({ position: "bottomright" }).addTo(map);

    /* the container's real size isn't committed yet on first paint (it mounts via
       next/dynamic inside a lazily-revealed section). invalidateSize once the
       container settles so Leaflet doesn't cache a 0x0 measurement. */
    const resizeObserver = new ResizeObserver(() => map.invalidateSize());
    resizeObserver.observe(containerRef.current);

    const projectMarker = L.marker([center.lat, center.lng], {
      icon: createPinIcon(true, undefined, projectLogo, projectName),
      zIndexOffset: 1000,
    }).addTo(map);
    projectMarkerRef.current = projectMarker;

    if (projectLogo) {
      /* project's own pin shows its wordmark logo, not a photo — same
         crop-proof reasoning as the mobile carousel's project card. */
      projectMarker.bindTooltip(
        `<div class="tooltip-inner-custom tooltip-inner-custom--logo"><img src="${projectLogo}" class="tooltip-logo-img" alt="${projectName}" title="${projectName}"></div>`,
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
        ? `<div class="tooltip-inner-custom"><img src="${p.image}" class="tooltip-img" alt="${p.place}" title="${p.place}"></div>`
        : `<div class="tooltip-inner-custom tooltip-inner-custom--text">${p.place}</div>`;

      const marker = L.marker([p.lat, p.lng], {
        icon: createPinIcon(false, CATEGORY_ICON[p.category ?? ""], undefined, p.category ?? p.place),
      })
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

  /* mouse drag-to-scroll for the mobile carousel, touch already scrolls
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
          className="carousel-item-card carousel-item-card--project"
          data-id="project"
          onClick={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" })}
        >
          {projectLogo && (
            /* project photos crop unpredictably at this aspect ratio. The
               wordmark logo is a cleaner, crop-proof identifier for the card.
               Forced white (same trick as .project-pin-logo) since both logos
               are dark-ink SVGs and this card has a dark background. */
            <div className="carousel-img-wrap carousel-logo-wrap">
              <Image
                src={projectLogo}
                alt={projectName}
                title={projectName}
                fill
                sizes="70vw"
                loading="lazy"
                className="object-contain p-8"
              />
            </div>
          )}
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
                  title={p.place}
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

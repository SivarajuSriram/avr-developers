import { site } from "@/lib/site";

/**
 * BreadcrumbList JSON-LD for the trail leading to *this* page (Home is
 * implicit and always position 1). Each page passes only its own segment(s),
 * e.g. `[{ name: "Evania", path: "/evania" }]`, so the schema always matches
 * the page it's on rather than listing the whole site's nav.
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${site.url}${item.path}`,
      })),
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

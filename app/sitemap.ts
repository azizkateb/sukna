import type { MetadataRoute } from "next";

const siteUrl = "https://www.sukna.shop";
const propertyIds = [1, 2, 3, 4, 5, 6, 7, 8];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-16T00:00:00.000Z");

  return [
    {
      url: siteUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...propertyIds.map((id) => ({
      url: `${siteUrl}/property/${id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}

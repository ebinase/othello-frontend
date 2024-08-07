import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://othello.ebinas.dev/",
      lastModified: new Date(),
    },
  ];
}

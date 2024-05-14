import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/api/", "/dashboard/"],
      },
      {
        userAgent: ["Applebot", "Bingbot", "googlebot"],
        disallow: ["/api/", "/dashboard/"],
      },
    ],
    sitemap: `${process.env.PROD_URL}/sitemap.xml`,
  }
}

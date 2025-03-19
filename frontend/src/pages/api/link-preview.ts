// server/api/link-preview.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import * as cheerio from "cheerio";

interface Metadata {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  hostname: string;
  favicon?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { url } = req.query;

  if (!url || typeof url !== "string") {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; LinkPreview/1.0)",
      },
      timeout: 5000,
    });

    const html = response.data;
    const $ = cheerio.load(html);

    const metadata: Metadata = {
      title:
        $('meta[property="og:title"]').attr("content") ||
        $('meta[name="twitter:title"]').attr("content") ||
        $("title").text().trim(),
      description:
        $('meta[property="og:description"]').attr("content") ||
        $('meta[name="twitter:description"]').attr("content") ||
        $('meta[name="description"]').attr("content"),
      image:
        $('meta[property="og:image"]').attr("content") ||
        $('meta[name="twitter:image"]').attr("content"),
      siteName:
        $('meta[property="og:site_name"]').attr("content") ||
        $('meta[name="application-name"]').attr("content"),
      hostname: new URL(url).hostname,
      favicon: `https://www.google.com/s2/favicons?domain=${url}`,
    };

    // Clean up undefined values
    Object.keys(metadata).forEach((key) => {
      const k = key as keyof Metadata;
      if (!metadata[k]) delete metadata[k];
    });

    res.status(200).json(metadata);
  } catch (error) {
    console.error("Link preview error:", error);
    res.status(500).json({
      error: "Failed to fetch metadata",
      fallback: {
        title: new URL(url).hostname,
        hostname: new URL(url).hostname,
      },
    });
  }
}

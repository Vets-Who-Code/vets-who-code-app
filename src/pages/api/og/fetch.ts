import type { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'node-html-parser';
import type { OGFetchResponse, URLMetadata } from '@/types/url-metadata';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OGFetchResponse>
) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const url = req.method === 'POST' ? req.body.url : req.query.url;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ success: false, error: 'URL is required' });
  }

  try {
    // Validate URL format
    const urlObj = new URL(url);

    // Fetch the URL content with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VetsWhoCodeBot/1.0; +https://vetswhocode.io)',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: `Failed to fetch URL: ${response.statusText}`
      });
    }

    const html = await response.text();
    const root = parse(html);

    // Helper function to get meta content
    const getMeta = (selector: string): string | undefined => {
      return root.querySelector(selector)?.getAttribute('content') || undefined;
    };

    // Extract Open Graph metadata
    const metadata: URLMetadata = {
      url,
      title:
        getMeta('meta[property="og:title"]') ||
        getMeta('meta[name="twitter:title"]') ||
        root.querySelector('title')?.text ||
        urlObj.hostname,
      description:
        getMeta('meta[property="og:description"]') ||
        getMeta('meta[name="twitter:description"]') ||
        getMeta('meta[name="description"]') ||
        undefined,
      image:
        getMeta('meta[property="og:image"]') ||
        getMeta('meta[name="twitter:image"]') ||
        getMeta('meta[property="og:image:url"]') ||
        undefined,
      siteName:
        getMeta('meta[property="og:site_name"]') ||
        urlObj.hostname,
      favicon:
        root.querySelector('link[rel="icon"]')?.getAttribute('href') ||
        root.querySelector('link[rel="shortcut icon"]')?.getAttribute('href') ||
        `${urlObj.origin}/favicon.ico`,
      type:
        getMeta('meta[property="og:type"]') ||
        'website',
    };

    // Convert relative URLs to absolute
    if (metadata.image && !metadata.image.startsWith('http')) {
      metadata.image = new URL(metadata.image, urlObj.origin).toString();
    }
    if (metadata.favicon && !metadata.favicon.startsWith('http')) {
      metadata.favicon = new URL(metadata.favicon, urlObj.origin).toString();
    }

    return res.status(200).json({ success: true, data: metadata });
  } catch (error) {
    console.error('Error fetching URL metadata:', error);

    if (error instanceof TypeError && error.message.includes('Invalid URL')) {
      return res.status(400).json({ success: false, error: 'Invalid URL format' });
    }

    if (error instanceof Error && error.name === 'AbortError') {
      return res.status(408).json({ success: false, error: 'Request timeout' });
    }

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch URL metadata'
    });
  }
}

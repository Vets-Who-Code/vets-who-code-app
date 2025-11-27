import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
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

    // Fetch the URL content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VetsWhoCodeBot/1.0; +https://vetswhocode.io)',
      },
      // Set timeout to 10 seconds
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      return res.status(400).json({
        success: false,
        error: `Failed to fetch URL: ${response.statusText}`
      });
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Extract Open Graph metadata
    const metadata: URLMetadata = {
      url: url,
      title:
        $('meta[property="og:title"]').attr('content') ||
        $('meta[name="twitter:title"]').attr('content') ||
        $('title').text() ||
        urlObj.hostname,
      description:
        $('meta[property="og:description"]').attr('content') ||
        $('meta[name="twitter:description"]').attr('content') ||
        $('meta[name="description"]').attr('content') ||
        undefined,
      image:
        $('meta[property="og:image"]').attr('content') ||
        $('meta[name="twitter:image"]').attr('content') ||
        $('meta[property="og:image:url"]').attr('content') ||
        undefined,
      siteName:
        $('meta[property="og:site_name"]').attr('content') ||
        urlObj.hostname,
      favicon:
        $('link[rel="icon"]').attr('href') ||
        $('link[rel="shortcut icon"]').attr('href') ||
        `${urlObj.origin}/favicon.ico`,
      type:
        $('meta[property="og:type"]').attr('content') ||
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

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch URL metadata'
    });
  }
}

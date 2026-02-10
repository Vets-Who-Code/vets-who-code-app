import Image from "next/image";
import { useEffect, useState } from "react";
import type { URLMetadata } from "@/types/url-metadata";

interface URLPreviewCardProps {
    url: string;
    className?: string;
}

// Generate a unique fallback image as an SVG data URL
function generateFallbackImage(hostname: string): string {
    // Hash function to generate consistent colors
    const hashCode = (str: string) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    const hash = Math.abs(hashCode(hostname));
    const hue1 = hash % 360;
    const hue2 = (hash + 60) % 360;

    const firstLetter = hostname.replace("www.", "").charAt(0).toUpperCase();

    const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:hsl(${hue1}, 70%, 50%);stop-opacity:1" />
          <stop offset="100%" style="stop-color:hsl(${hue2}, 70%, 35%);stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="630" fill="url(#grad)"/>
      <circle cx="1000" cy="100" r="200" fill="rgba(255,255,255,0.1)"/>
      <circle cx="200" cy="530" r="250" fill="rgba(0,0,0,0.1)"/>
      <rect x="500" y="215" width="200" height="200" rx="30" fill="rgba(255,255,255,0.95)"/>
      <text x="600" y="350" font-family="Arial, sans-serif" font-size="120" font-weight="bold" fill="hsl(${hue2}, 70%, 35%)" text-anchor="middle">${firstLetter}</text>
      <text x="600" y="450" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" text-anchor="middle">${hostname}</text>
      <text x="600" y="510" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.9)" text-anchor="middle">Shared from Vets Who Code</text>
    </svg>
  `;

    // Use btoa for browser compatibility (or encodeURIComponent for simpler approach)
    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export default function URLPreviewCard({ url, className = "" }: URLPreviewCardProps) {
    const [metadata, setMetadata] = useState<URLMetadata | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch("/api/og/fetch", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ url }),
                });

                // Check if response is JSON
                const contentType = response.headers.get("content-type");
                if (!contentType || !contentType.includes("application/json")) {
                    const text = await response.text();
                    console.error("Non-JSON response:", text);
                    setError("Server returned an error. Check console for details.");
                    return;
                }

                const data = await response.json();

                if (data.success && data.data) {
                    setMetadata(data.data);
                } else {
                    setError(data.error || "Failed to fetch URL metadata");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err instanceof Error ? err.message : "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        if (url) {
            fetchMetadata();
        }
    }, [url]);

    if (loading) {
        return (
            <div
                className={`tw-animate-pulse tw-border tw-border-gray-200 tw-rounded-lg tw-overflow-hidden ${className}`}
            >
                <div className="tw-h-48 tw-bg-gray-50" />
                <div className="tw-p-4">
                    <div className="tw-h-4 tw-bg-gray-50 tw-rounded tw-w-3/4 tw-mb-2" />
                    <div className="tw-h-3 tw-bg-gray-50 tw-rounded tw-w-full tw-mb-1" />
                    <div className="tw-h-3 tw-bg-gray-50 tw-rounded tw-w-5/6" />
                </div>
            </div>
        );
    }

    if (error || !metadata) {
        return (
            <div
                className={`tw-border tw-border-red-200 tw-rounded-lg tw-p-4 tw-bg-red-50 ${className}`}
            >
                <p className="tw-text-red-600 tw-text-sm">{error || "Failed to load preview"}</p>
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tw-text-navy-royal tw-text-sm tw-underline tw-break-all"
                >
                    {url}
                </a>
            </div>
        );
    }

    const { hostname } = new URL(metadata.url);

    // Generate fallback image
    const fallbackImage = generateFallbackImage(hostname);
    const displayImage = metadata.image || fallbackImage;

    return (
        <a
            href={metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`tw-group tw-block tw-border tw-border-gray-200 tw-rounded-lg tw-overflow-hidden tw-transition-all tw-duration-300 hover:tw-shadow-lg hover:tw-border-gray-300 ${className}`}
        >
            <div className="tw-relative tw-h-48 tw-bg-gray-100 tw-overflow-hidden">
                <Image
                    src={displayImage}
                    alt={metadata.title || "Preview image"}
                    fill={true}
                    className="tw-object-cover tw-group-hover:tw-scale-105 tw-transition-transform tw-duration-300"
                    unoptimized={true}
                />
            </div>
            <div className="tw-p-4">
                {metadata.siteName && (
                    <div className="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                        {metadata.favicon && (
                            <Image
                                src={metadata.favicon}
                                alt=""
                                width={16}
                                height={16}
                                className="tw-rounded-sm"
                                unoptimized={true}
                            />
                        )}
                        <span className="tw-text-xs tw-text-gray-500">{metadata.siteName}</span>
                    </div>
                )}
                <h3 className="tw-font-semibold tw-text-ink tw-mb-2 tw-line-clamp-2 group-hover:tw-text-navy-royal tw-transition-colors">
                    {metadata.title}
                </h3>
                {metadata.description && (
                    <p className="tw-text-sm tw-text-gray-300 tw-line-clamp-2">
                        {metadata.description}
                    </p>
                )}
                <p className="tw-text-xs tw-text-gray-400 tw-mt-2 tw-truncate">{hostname}</p>
            </div>
        </a>
    );
}

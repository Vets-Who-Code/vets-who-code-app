import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { URLMetadata } from '@/types/url-metadata';

interface URLPreviewCardProps {
  url: string;
  className?: string;
}

export default function URLPreviewCard({ url, className = '' }: URLPreviewCardProps) {
  const [metadata, setMetadata] = useState<URLMetadata | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/og/fetch', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        });

        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Non-JSON response:', text);
          setError('Server returned an error. Check console for details.');
          return;
        }

        const data = await response.json();

        if (data.success && data.data) {
          setMetadata(data.data);
        } else {
          setError(data.error || 'Failed to fetch URL metadata');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err instanceof Error ? err.message : 'An error occurred');
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
      <div className={`tw-animate-pulse tw-border tw-border-gray-200 tw-rounded-lg tw-overflow-hidden ${className}`}>
        <div className="tw-h-48 tw-bg-gray-200" />
        <div className="tw-p-4">
          <div className="tw-h-4 tw-bg-gray-200 tw-rounded tw-w-3/4 tw-mb-2" />
          <div className="tw-h-3 tw-bg-gray-200 tw-rounded tw-w-full tw-mb-1" />
          <div className="tw-h-3 tw-bg-gray-200 tw-rounded tw-w-5/6" />
        </div>
      </div>
    );
  }

  if (error || !metadata) {
    return (
      <div className={`tw-border tw-border-red-200 tw-rounded-lg tw-p-4 tw-bg-red-50 ${className}`}>
        <p className="tw-text-red-600 tw-text-sm">
          {error || 'Failed to load preview'}
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="tw-text-blue-600 tw-text-sm tw-underline tw-break-all"
        >
          {url}
        </a>
      </div>
    );
  }

  const hostname = new URL(metadata.url).hostname;
  const displayImage = metadata.image || `/api/og/generate?url=${encodeURIComponent(url)}`;

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
          alt={metadata.title || 'Preview image'}
          fill
          className="tw-object-cover group-hover:tw-scale-105 tw-transition-transform tw-duration-300"
          unoptimized={!metadata.image}
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
                unoptimized
              />
            )}
            <span className="tw-text-xs tw-text-gray-500">
              {metadata.siteName}
            </span>
          </div>
        )}
        <h3 className="tw-font-semibold tw-text-gray-900 tw-mb-2 tw-line-clamp-2 group-hover:tw-text-blue-600 tw-transition-colors">
          {metadata.title}
        </h3>
        {metadata.description && (
          <p className="tw-text-sm tw-text-gray-600 tw-line-clamp-2">
            {metadata.description}
          </p>
        )}
        <p className="tw-text-xs tw-text-gray-400 tw-mt-2 tw-truncate">
          {hostname}
        </p>
      </div>
    </a>
  );
}

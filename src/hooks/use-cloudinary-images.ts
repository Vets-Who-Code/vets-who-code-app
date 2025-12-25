import { useState, useCallback, useEffect } from 'react';

export interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: string;
  type: string;
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
  folder?: string;
  tags?: string[];
}

interface UseCloudinaryImagesOptions {
  folder?: string;
  max_results?: number;
  autoFetch?: boolean;
}

interface UseCloudinaryImagesReturn {
  images: CloudinaryImage[];
  loading: boolean;
  error: string | null;
  nextCursor?: string;
  hasMore: boolean;
  fetchImages: (cursor?: string) => Promise<void>;
  searchImages: (expression: string) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

/**
 * Custom hook for fetching images from Cloudinary
 * @param options - Options for fetching images
 */
export function useCloudinaryImages(
  options: UseCloudinaryImagesOptions = {}
): UseCloudinaryImagesReturn {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);

  const fetchImages = useCallback(
    async (cursor?: string) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();

        if (options.folder) {
          params.append('folder', options.folder);
        }

        if (options.max_results) {
          params.append('max_results', options.max_results.toString());
        }

        if (cursor) {
          params.append('next_cursor', cursor);
        }

        const response = await fetch(`/api/cloudinary/list?${params.toString()}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch images');
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Failed to fetch images');
        }

        if (cursor) {
          // Append to existing images when loading more
          setImages((prev) => [...prev, ...(data.resources || [])]);
        } else {
          // Replace images when fetching fresh
          setImages(data.resources || []);
        }

        setNextCursor(data.next_cursor);
        setHasMore(!!data.next_cursor);
        setLoading(false);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch images';
        setError(errorMessage);
        setLoading(false);
        throw err;
      }
    },
    [options.folder, options.max_results]
  );

  const searchImages = useCallback(async (expression: string) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        expression,
      });

      if (options.max_results) {
        params.append('max_results', options.max_results.toString());
      }

      const response = await fetch(`/api/cloudinary/search?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to search images');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to search images');
      }

      setImages(data.resources || []);
      setNextCursor(data.next_cursor);
      setHasMore(!!data.next_cursor);
      setLoading(false);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search images';
      setError(errorMessage);
      setLoading(false);
      throw err;
    }
  }, [options.max_results]);

  const loadMore = useCallback(async () => {
    if (!hasMore || !nextCursor) {
      return;
    }
    await fetchImages(nextCursor);
  }, [hasMore, nextCursor, fetchImages]);

  const refresh = useCallback(async () => {
    await fetchImages();
  }, [fetchImages]);

  // Auto-fetch on mount if enabled
  useEffect(() => {
    if (options.autoFetch !== false) {
      fetchImages();
    }
  }, [options.autoFetch]); // Only run on mount

  return {
    images,
    loading,
    error,
    nextCursor,
    hasMore,
    fetchImages,
    searchImages,
    loadMore,
    refresh,
  };
}

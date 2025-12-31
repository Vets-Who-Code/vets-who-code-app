/**
 * Cloudinary Media Library Component
 * Allows users to browse, search, and select images from their Cloudinary account
 *
 * Usage:
 * ```tsx
 * <CloudinaryMediaLibrary
 *   onSelect={(image) => console.log('Selected:', image)}
 *   folder="my-folder"
 *   multiSelect={false}
 * />
 * ```
 */

import React, { useState, useCallback } from 'react';
import { useCloudinaryImages, CloudinaryImage } from '@/hooks/use-cloudinary-images';
import MyImage from '@/components/ui/image';

interface CloudinaryMediaLibraryProps {
  onSelect?: (image: CloudinaryImage | CloudinaryImage[]) => void;
  onClose?: () => void;
  folder?: string;
  multiSelect?: boolean;
  maxResults?: number;
}

const CloudinaryMediaLibrary: React.FC<CloudinaryMediaLibraryProps> = ({
  onSelect,
  onClose,
  folder,
  multiSelect = false,
  maxResults = 30,
}) => {
  const [selectedImages, setSelectedImages] = useState<CloudinaryImage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    images,
    loading,
    error,
    hasMore,
    searchImages,
    loadMore,
    refresh,
  } = useCloudinaryImages({
    folder,
    max_results: maxResults,
    autoFetch: true,
  });

  const handleImageClick = useCallback(
    (image: CloudinaryImage) => {
      if (multiSelect) {
        setSelectedImages((prev) => {
          const isSelected = prev.some((img) => img.public_id === image.public_id);
          if (isSelected) {
            return prev.filter((img) => img.public_id !== image.public_id);
          } 
            return [...prev, image];
          
        });
      } else {
        setSelectedImages([image]);
      }
    },
    [multiSelect]
  );

  const handleSelect = useCallback(() => {
    if (onSelect) {
      if (multiSelect) {
        onSelect(selectedImages);
      } else {
        onSelect(selectedImages[0]);
      }
    }
    setSelectedImages([]);
  }, [selectedImages, multiSelect, onSelect]);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        const expression = folder
          ? `folder:${folder} AND ${searchQuery}`
          : searchQuery;
        await searchImages(expression);
      } else {
        refresh();
      }
    },
    [searchQuery, folder, searchImages, refresh]
  );

  const isSelected = useCallback(
    (image: CloudinaryImage) => {
      return selectedImages.some((img) => img.public_id === image.public_id);
    },
    [selectedImages]
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0 }}>Media Library</h2>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ marginTop: '15px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search images... (e.g., tags:profile, format:jpg)"
              style={{
                flex: 1,
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Search
            </button>
            <button
              type="button"
              onClick={refresh}
              style={{
                padding: '10px 20px',
                backgroundColor: '#2196f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Refresh
            </button>
          </div>
        </form>

        {folder && (
          <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
            Folder: {folder}
          </p>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
        {error && (
          <div
            style={{
              padding: '15px',
              backgroundColor: '#ffebee',
              color: '#c62828',
              borderRadius: '4px',
              marginBottom: '20px',
            }}
          >
            Error: {error}
          </div>
        )}

        {loading && images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p>Loading images...</p>
          </div>
        ) : images.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            <p>No images found</p>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '15px',
              }}
            >
              {images.map((image) => (
                <div
                  key={image.public_id}
                  onClick={() => handleImageClick(image)}
                  style={{
                    position: 'relative',
                    cursor: 'pointer',
                    border: isSelected(image) ? '3px solid #4caf50' : '1px solid #e0e0e0',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
                    <div style={{ position: 'absolute', inset: 0 }}>
                      <MyImage
                        src={image.secure_url}
                        alt={image.public_id}
                        width={200}
                        height={200}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                  </div>
                  {isSelected(image) && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        width: '30px',
                        height: '30px',
                        backgroundColor: '#4caf50',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: 'bold',
                      }}
                    >
                      ✓
                    </div>
                  )}
                  <div
                    style={{
                      padding: '10px',
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      fontSize: '12px',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      title={image.public_id}
                    >
                      {image.public_id.split('/').pop()}
                    </p>
                    <p style={{ margin: '5px 0 0 0', fontSize: '11px', color: '#ccc' }}>
                      {image.width} × {image.height} • {(image.bytes / 1024).toFixed(0)}KB
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {hasMore && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={loadMore}
                  disabled={loading}
                  style={{
                    padding: '10px 30px',
                    backgroundColor: '#2196f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                  }}
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      {selectedImages.length > 0 && (
        <div
          style={{
            padding: '20px',
            borderTop: '1px solid #e0e0e0',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p style={{ margin: 0, fontWeight: 'bold' }}>
            {selectedImages.length} image{selectedImages.length !== 1 ? 's' : ''} selected
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setSelectedImages([])}
              style={{
                padding: '10px 20px',
                backgroundColor: '#757575',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Clear Selection
            </button>
            <button
              onClick={handleSelect}
              style={{
                padding: '10px 20px',
                backgroundColor: '#4caf50',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Select {selectedImages.length} Image{selectedImages.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudinaryMediaLibrary;

/**
 * Blog Image Manager Component
 * Helps browse and select images from Cloudinary for blog posts
 * Provides the proper markdown format for blog frontmatter
 */

import React, { useState } from 'react';
import CloudinaryMediaLibrary from '@/components/cloudinary-media-library';
import { CloudinaryImage } from '@/hooks/use-cloudinary-images';
import MyImage from '@/components/ui/image';
import styles from './blog-image-manager.module.css';

const BlogImageManager: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<CloudinaryImage | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [customTransformations, setCustomTransformations] = useState({
    width: 1200,
    quality: 'auto',
    format: 'auto',
    gravity: 'auto',
  });

  const handleImageSelect = (image: CloudinaryImage | CloudinaryImage[]) => {
    if (Array.isArray(image)) {
      setSelectedImage(image[0]);
    } else {
      setSelectedImage(image);
    }
    setShowLibrary(false);
  };

  const generateOptimizedUrl = () => {
    if (!selectedImage) return '';

    const { secure_url } = selectedImage;

    // Build transformation string
    const transformations = [];

    if (customTransformations.format !== 'none') {
      transformations.push(`f_${customTransformations.format}`);
    }
    if (customTransformations.quality !== 'none') {
      transformations.push(`q_${customTransformations.quality}`);
    }
    if (customTransformations.gravity !== 'none') {
      transformations.push(`g_${customTransformations.gravity}`);
    }
    if (customTransformations.width) {
      transformations.push(`w_${customTransformations.width}`);
      transformations.push('c_limit');
    }

    // Add additional transformations
    transformations.push('dpr_auto', 'fl_progressive', 'fl_strip_profile');

    // Insert transformations into URL
    if (secure_url.includes('/upload/')) {
      const parts = secure_url.split('/upload/');
      return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
    }

    return secure_url;
  };

  const generateMarkdownFrontmatter = () => {
    if (!selectedImage) return '';

    // Use just the public_id for the new format
    return `image:
    src: "${selectedImage.public_id}"
    alt: "Blog header image"`;
  };

  const generateMarkdownFrontmatterLegacy = () => {
    if (!selectedImage) return '';

    const optimizedUrl = generateOptimizedUrl();

    return `image:
    src: "${optimizedUrl}"
    alt: "Blog header image"`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Blog Image Manager</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        Browse your Cloudinary images and generate optimized URLs for blog posts
      </p>

      <button
        type="button"
        onClick={() => setShowLibrary(true)}
        className="blog-image-manager__browse-btn"
      >
        Browse Cloudinary Images
      </button>

      {selectedImage && (
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              marginBottom: '30px',
            }}
          >
            {/* Image Preview */}
            <div>
              <h2>Image Preview</h2>
              <MyImage
                src={generateOptimizedUrl()}
                alt={selectedImage.public_id}
                width={600}
                height={400}
                style={{ borderRadius: '8px', width: '100%', height: 'auto' }}
              />
              <div
                style={{
                  marginTop: '15px',
                  padding: '15px',
                  backgroundColor: '#f5f5f5',
                  borderRadius: '4px',
                  fontSize: '14px',
                }}
              >
                <p>
                  <strong>Public ID:</strong> {selectedImage.public_id}
                </p>
                <p>
                  <strong>Size:</strong> {selectedImage.width} × {selectedImage.height}
                </p>
                <p>
                  <strong>Format:</strong> {selectedImage.format}
                </p>
                <p>
                  <strong>File Size:</strong> {(selectedImage.bytes / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            {/* Transformation Options */}
            <div>
              <h2>Image Transformations</h2>
              <div style={{ marginBottom: '30px' }}>
                <div style={{ marginBottom: '15px' }}>
                  <label
                    style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                  >
                    Width (pixels)
                  </label>
                  <input
                    type="number"
                    value={customTransformations.width}
                    onChange={(e) =>
                      setCustomTransformations({
                        ...customTransformations,
                        width: parseInt(e.target.value),
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  />
                  <p style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                    Recommended: 1200px for blog headers
                  </p>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label
                    style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                  >
                    Quality
                  </label>
                  <select
                    value={customTransformations.quality}
                    onChange={(e) =>
                      setCustomTransformations({
                        ...customTransformations,
                        quality: e.target.value,
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <option value="auto">Auto (Recommended)</option>
                    <option value="auto:best">Auto Best</option>
                    <option value="auto:good">Auto Good</option>
                    <option value="auto:eco">Auto Eco</option>
                    <option value="auto:low">Auto Low</option>
                    <option value="100">100 (Best)</option>
                    <option value="80">80 (High)</option>
                    <option value="60">60 (Medium)</option>
                    <option value="none">None</option>
                  </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label
                    style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                  >
                    Format
                  </label>
                  <select
                    value={customTransformations.format}
                    onChange={(e) =>
                      setCustomTransformations({
                        ...customTransformations,
                        format: e.target.value,
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <option value="auto">Auto (Recommended)</option>
                    <option value="webp">WebP</option>
                    <option value="jpg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="none">Original</option>
                  </select>
                </div>

                <div style={{ marginBottom: '15px' }}>
                  <label
                    style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
                  >
                    Gravity (Focus)
                  </label>
                  <select
                    value={customTransformations.gravity}
                    onChange={(e) =>
                      setCustomTransformations({
                        ...customTransformations,
                        gravity: e.target.value,
                      })
                    }
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                    }}
                  >
                    <option value="auto">Auto (Recommended)</option>
                    <option value="center">Center</option>
                    <option value="face">Face</option>
                    <option value="faces">Faces</option>
                    <option value="north">North (Top)</option>
                    <option value="south">South (Bottom)</option>
                    <option value="east">East (Right)</option>
                    <option value="west">West (Left)</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div style={{ marginTop: '30px' }}>
            <h2>Blog Frontmatter (YAML) - Recommended</h2>
            <p style={{ color: '#666', marginBottom: '10px' }}>
              Use this format with just the public ID. Transformations are applied automatically:
            </p>
            <div style={{ position: 'relative' }}>
              <pre
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '20px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                {generateMarkdownFrontmatter()}
              </pre>
              <button
                onClick={() => copyToClipboard(generateMarkdownFrontmatter())}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Copy Public ID
              </button>
            </div>

            <h2 style={{ marginTop: '30px' }}>Legacy Format (Full URL)</h2>
            <p style={{ color: '#666', marginBottom: '10px' }}>
              Or use the full URL with custom transformations (also works):
            </p>
            <div style={{ position: 'relative' }}>
              <pre
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '20px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.6',
                }}
              >
                {generateMarkdownFrontmatterLegacy()}
              </pre>
              <button
                onClick={() => copyToClipboard(generateMarkdownFrontmatterLegacy())}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Copy Full URL
              </button>
            </div>
          </div>

          {/* Public ID Display */}
          <div style={{ marginTop: '30px' }}>
            <h2>Cloudinary Public ID</h2>
            <p style={{ color: '#666', marginBottom: '10px' }}>
              This is the identifier for this image in your Cloudinary account:
            </p>
            <div style={{ position: 'relative' }}>
              <pre
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '20px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '14px',
                  wordBreak: 'break-all',
                }}
              >
                {selectedImage.public_id}
              </pre>
              <button
                onClick={() => copyToClipboard(selectedImage.public_id)}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Copy ID
              </button>
            </div>

            <h2 style={{ marginTop: '30px' }}>Direct URL</h2>
            <p style={{ color: '#666', marginBottom: '10px' }}>
              Use this URL directly in your application:
            </p>
            <div style={{ position: 'relative' }}>
              <pre
                style={{
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  padding: '20px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  fontSize: '14px',
                  wordBreak: 'break-all',
                }}
              >
                {generateOptimizedUrl()}
              </pre>
              <button
                onClick={() => copyToClipboard(generateOptimizedUrl())}
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  padding: '8px 16px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Library Modal */}
      {showLibrary && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => setShowLibrary(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '1200px',
              height: '80vh',
              overflow: 'hidden',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloudinaryMediaLibrary
              onSelect={handleImageSelect}
              onClose={() => setShowLibrary(false)}
              multiSelect={false}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogImageManager;

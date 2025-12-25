/**
 * Example component demonstrating Cloudinary image upload functionality
 * This component shows how to use the useImageUpload hook for single and multiple file uploads
 *
 * Usage:
 * 1. Import the component: import CloudinaryUploadExample from '@/components/cloudinary-upload-example'
 * 2. Add to your page: <CloudinaryUploadExample />
 *
 * Features demonstrated:
 * - Single file upload with preview
 * - Multiple file uploads
 * - Upload progress tracking
 * - Error handling
 * - File validation
 */

import React, { useState } from 'react';
import { useImageUpload } from '@/hooks/use-image-upload';
import MyImage from '@/components/ui/image';

const CloudinaryUploadExample: React.FC = () => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const { upload, uploadMultiple, uploading, error, progress, reset } = useImageUpload({
    folder: 'vets-who-code/examples',
    maxSizeInMB: 5,
  });

  const handleSingleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await upload(file);
      setUploadedImageUrl(result.url);
      console.log('Uploaded successfully:', result);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  const handleMultipleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      const results = await uploadMultiple(Array.from(files));
      setUploadedImages(results.map((r) => r.url));
      console.log('Uploaded successfully:', results);
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Cloudinary Upload Example</h1>

      {/* Single File Upload */}
      <section style={{ marginBottom: '40px' }}>
        <h2>Single File Upload</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleSingleUpload}
          disabled={uploading}
        />

        {uploading && (
          <div style={{ marginTop: '10px' }}>
            <p>Uploading... {progress}%</p>
            <div
              style={{
                width: '100%',
                height: '10px',
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#4caf50',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}

        {error && (
          <div style={{ color: 'red', marginTop: '10px' }}>
            Error: {error}
            <button onClick={reset} style={{ marginLeft: '10px' }}>
              Clear Error
            </button>
          </div>
        )}

        {uploadedImageUrl && (
          <div style={{ marginTop: '20px' }}>
            <p>Uploaded Image:</p>
            <MyImage
              src={uploadedImageUrl}
              alt="Uploaded image"
              width={400}
              height={300}
              style={{ borderRadius: '8px' }}
            />
            <p style={{ fontSize: '12px', wordBreak: 'break-all' }}>
              URL: {uploadedImageUrl}
            </p>
          </div>
        )}
      </section>

      {/* Multiple File Upload */}
      <section>
        <h2>Multiple File Upload</h2>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleMultipleUpload}
          disabled={uploading}
        />

        {uploadedImages.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <p>Uploaded Images ({uploadedImages.length}):</p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
                marginTop: '10px',
              }}
            >
              {uploadedImages.map((url, index) => (
                <div key={index}>
                  <MyImage
                    src={url}
                    alt={`Uploaded image ${index + 1}`}
                    width={200}
                    height={150}
                    style={{ borderRadius: '8px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Usage Instructions */}
      <section style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
        <h3>How to Use in Your Components</h3>
        <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`import { useImageUpload } from '@/hooks/use-image-upload';

function MyComponent() {
  const { upload, uploading, error } = useImageUpload({
    folder: 'my-folder',
    maxSizeInMB: 5,
  });

  const handleUpload = async (file: File) => {
    try {
      const result = await upload(file);
      console.log('Image uploaded:', result.url);
      // Save result.url to your database
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <input
      type="file"
      onChange={(e) => {
        const file = e.target.files?.[0];
        if (file) handleUpload(file);
      }}
      disabled={uploading}
    />
  );
}`}
        </pre>
      </section>
    </div>
  );
};

export default CloudinaryUploadExample;

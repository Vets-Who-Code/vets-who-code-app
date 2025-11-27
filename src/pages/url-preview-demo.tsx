import { useState } from 'react';
import URLPreviewCard from '@/components/url-preview-card';

const URLPreviewDemo = () => {
  const [url, setUrl] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedUrl(url);
  };

  const exampleUrls = [
    'https://vetswhocode.io',
    'https://github.com/Vets-Who-Code',
    'https://www.npmjs.com/package/next',
  ];

  return (
    <div className="tw-min-h-screen tw-bg-gray-50 tw-py-12 tw-px-4">
      <div className="tw-max-w-4xl tw-mx-auto">
        <h1 className="tw-text-4xl tw-font-bold tw-text-gray-900 tw-mb-8 tw-text-center">
          URL Preview Card Demo
        </h1>

        <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-mb-8">
          <form onSubmit={handleSubmit} className="tw-space-y-4">
            <div>
              <label htmlFor="url" className="tw-block tw-text-sm tw-font-medium tw-text-gray-700 tw-mb-2">
                Enter a URL to preview
              </label>
              <div className="tw-flex tw-gap-2">
                <input
                  type="url"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com"
                  className="tw-flex-1 tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-md focus:tw-ring-2 focus:tw-ring-blue-500 focus:tw-border-transparent"
                  required
                />
                <button
                  type="submit"
                  className="tw-px-6 tw-py-2 tw-bg-blue-600 tw-text-white tw-rounded-md hover:tw-bg-blue-700 tw-transition-colors"
                >
                  Preview
                </button>
              </div>
            </div>
          </form>

          <div className="tw-mt-4">
            <p className="tw-text-sm tw-text-gray-600 tw-mb-2">Try these examples:</p>
            <div className="tw-flex tw-flex-wrap tw-gap-2">
              {exampleUrls.map((exampleUrl) => (
                <button
                  key={exampleUrl}
                  type="button"
                  onClick={() => {
                    setUrl(exampleUrl);
                    setSubmittedUrl(exampleUrl);
                  }}
                  className="tw-px-3 tw-py-1 tw-text-sm tw-bg-gray-100 tw-text-gray-700 tw-rounded-md hover:tw-bg-gray-200 tw-transition-colors"
                >
                  {new URL(exampleUrl).hostname}
                </button>
              ))}
            </div>
          </div>
        </div>

        {submittedUrl && (
          <div className="tw-space-y-8">
            <div>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-gray-900 tw-mb-4">
                Preview Card
              </h2>
              <URLPreviewCard url={submittedUrl} />
            </div>

            <div>
              <h2 className="tw-text-2xl tw-font-semibold tw-text-gray-900 tw-mb-4">
                Usage Example
              </h2>
              <div className="tw-bg-gray-900 tw-rounded-lg tw-p-6 tw-overflow-x-auto">
                <pre className="tw-text-sm tw-text-gray-100">
                  <code>{`import URLPreviewCard from '@/components/url-preview-card';

function MyComponent() {
  return (
    <URLPreviewCard
      url="${submittedUrl}"
    />
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default URLPreviewDemo;

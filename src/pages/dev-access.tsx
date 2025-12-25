import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import type { NextPage } from 'next';

/**
 * Dev-only page to bypass authentication for local testing
 * Only works in development mode
 */
const DevAccess: NextPage = () => {
  const router = useRouter();
  const [isDevMode, setIsDevMode] = useState(false);

  useEffect(() => {
    // Check if we're in development
    const isDev = process.env.NODE_ENV === 'development';
    setIsDevMode(isDev);

    if (!isDev) {
      router.push('/');
      return;
    }

    // Set dev bypass cookie
    document.cookie = 'dev-bypass=true; path=/; max-age=86400'; // 24 hours

    // Redirect after 2 seconds
    const timeout = setTimeout(() => {
      const callbackUrl = router.query.callbackUrl as string;
      router.push(callbackUrl || '/jobs');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [router]);

  if (!isDevMode) {
    return (
      <div className="tw-flex tw-min-h-screen tw-items-center tw-justify-center tw-bg-gray-100">
        <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md">
          <h1 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-red-600">
            Not Available in Production
          </h1>
          <p className="tw-text-gray-200">
            This page is only available in development mode.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="tw-flex tw-min-h-screen tw-items-center tw-justify-center tw-bg-gray-100">
      <div className="tw-rounded-lg tw-bg-white tw-p-8 tw-shadow-md tw-text-center">
        <div className="tw-mb-4">
          <i className="fas fa-cog fa-spin tw-text-6xl tw-text-primary" />
        </div>
        <h1 className="tw-mb-4 tw-text-2xl tw-font-bold tw-text-ink">
          Dev Access Enabled
        </h1>
        <p className="tw-mb-4 tw-text-gray-200">
          Setting up development bypass...
        </p>
        <p className="tw-text-sm tw-text-gray-500">
          Redirecting to job board...
        </p>
      </div>
    </div>
  );
};

export default DevAccess;

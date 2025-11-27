import { ImageResponse } from '@vercel/og';
import type { NextRequest } from 'next/server';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const url = searchParams.get('url');

    if (!url) {
      return new Response('URL parameter is required', { status: 400 });
    }

    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    // Generate unique colors based on hostname
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

    const gradient1 = `hsl(${hue1}, 70%, 50%)`;
    const gradient2 = `hsl(${hue2}, 70%, 35%)`;

    // Get first letter of hostname for the icon
    const firstLetter = hostname.replace('www.', '').charAt(0).toUpperCase();

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${gradient1} 0%, ${gradient2} 100%)`,
            position: 'relative',
          }}
        >
          {/* Decorative circles in background */}
          <div
            style={{
              position: 'absolute',
              top: '-100px',
              right: '-100px',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              display: 'flex',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-150px',
              left: '-150px',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              display: 'flex',
            }}
          />

          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Letter icon */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '200px',
                height: '200px',
                borderRadius: '30px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                marginBottom: '40px',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
              }}
            >
              <div
                style={{
                  fontSize: '120px',
                  fontWeight: 'bold',
                  color: gradient2,
                }}
              >
                {firstLetter}
              </div>
            </div>

            {/* Hostname */}
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                color: '#ffffff',
                textAlign: 'center',
                marginBottom: '16px',
                maxWidth: '900px',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              {hostname}
            </div>

            {/* Subtitle */}
            <div
              style={{
                fontSize: '24px',
                color: 'rgba(255, 255, 255, 0.9)',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
                  stroke="rgba(255, 255, 255, 0.9)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Shared from Vets Who Code
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}

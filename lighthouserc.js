module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000',
        // 'http://localhost:3000/courses',
        // 'http://localhost:3000/blog',
        'http://localhost:3000/blogs/blog',
        'http://localhost:3000/about-us',
      ],
      numberOfRuns: 3,
      
    },
    budgets: [
  {
    path: '/*',
    resourceSizes: [
      {
        resourceType: 'document',
        budget: 50,
      },
      {
        resourceType: 'script',
        budget: 300,
      },
      {
        resourceType: 'stylesheet',
        budget: 50,
      },
      {
        resourceType: 'image',
        budget: 500,
      },
      {
        resourceType: 'font',
        budget: 100,
      },
    ],
    resourceCounts: [
      {
        resourceType: 'third-party',
        budget: 10,
      },
    ],
  },
],
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        // Performance
        'first-contentful-paint': ['warn', { maxNumericValue: 4000 }],   // warn only, not error
        'largest-contentful-paint': ['warn', { maxNumericValue: 6000 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.25 }],
        'total-blocking-time': ['warn', { maxNumericValue: 600 }],
        'speed-index': ['warn', { maxNumericValue: 3000 }],

        // Accessibility
        'color-contrast': 'error',
        'image-alt': 'error',
        'label': 'error',
        'aria-allowed-attr': 'error',

        // SEO
        'meta-description': 'warn',
        'document-title': 'error',
        'link-text': 'warn',

        // Best Practices
        'errors-in-console': 'warn',

        // PWA (optional)
        'installable-manifest': 'off',
        'service-worker': 'off',
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};

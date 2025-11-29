import { test, expect } from '@playwright/test';

/**
 * Security Tests - Verify Protected Routes
 *
 * These tests verify that protected routes cannot be accessed
 * without proper authentication in production mode.
 */

test.describe('Protected Routes - Authentication Required', () => {

  test.beforeEach(async ({ page }) => {
    // Clear all cookies and storage to ensure unauthenticated state
    await page.context().clearCookies();
    await page.evaluate(() => {
      localStorage.clear();
      sessionStorage.clear();
    });
  });

  test('Resume Translator - redirects to login when unauthenticated', async ({ page }) => {
    // Attempt to access resume translator
    await page.goto('/resume-translator');

    // Should redirect to login page with callback URL
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
    expect(page.url()).toContain('callbackUrl=%2Fresume-translator');
  });

  test('Courses Index - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/courses');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
    expect(page.url()).toContain('callbackUrl=%2Fcourses');
  });

  test('Software Engineering Course - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/courses/software-engineering');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
    expect(page.url()).toContain('callbackUrl=%2Fcourses%2Fsoftware-engineering');
  });

  test('Data Engineering Course - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/courses/data-engineering');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('AI Engineering Course - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/courses/ai-engineering');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('Web Development Course - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/courses/web-development');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('DevOps Course - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/courses/devops');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('Lesson Player - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/courses/web-development/1/1');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });

  test('Job Board - redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/jobs');

    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');
  });
});

test.describe('Dev Login Protection', () => {

  test('Dev login page should not be accessible in production', async ({ page }) => {
    // This test assumes NODE_ENV=production
    // In production, /dev-login should redirect to homepage

    // Note: This test needs to be run with NODE_ENV=production
    // In development, it will show the dev login page (expected behavior)

    const response = await page.goto('/dev-login');

    // Check if we're in production mode by checking environment
    // If in production, should redirect to home
    // If in development, should show dev login page

    const isProduction = process.env.NODE_ENV === 'production';

    if (isProduction) {
      // Should redirect to homepage in production
      expect(page.url()).toBe(new URL('/', page.url()).href);
    } else {
      // In development, should show dev login page
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toContainText('Development Login');
    }
  });

  test('Dev session API should return 403 in production', async ({ request }) => {
    // This test verifies the API endpoint protection
    const isProduction = process.env.NODE_ENV === 'production';

    const response = await request.post('/api/auth/dev-session', {
      data: {
        email: 'test@example.com'
      }
    });

    if (isProduction) {
      // Should return 403 in production
      expect(response.status()).toBe(403);
      const data = await response.json();
      expect(data.error).toBe('Not available in production');
    } else {
      // In development, should work
      expect(response.status()).toBeLessThan(500);
    }
  });
});

test.describe('Client-Side Bypass Prevention', () => {

  test('Cannot bypass auth with localStorage manipulation', async ({ page }) => {
    // Set fake dev session in localStorage
    await page.goto('/');
    await page.evaluate(() => {
      const fakeUser = {
        id: 'fake-user',
        name: 'Fake User',
        email: 'fake@example.com',
        image: 'https://example.com/fake.png'
      };
      localStorage.setItem('dev-session', JSON.stringify(fakeUser));
    });

    // Try to access protected route
    await page.goto('/resume-translator');

    // Should still redirect to login because server-side auth is required
    await page.waitForURL(/\/login/);
    expect(page.url()).toContain('/login');

    // Verify localStorage was set (to prove the test is valid)
    const devSession = await page.evaluate(() => localStorage.getItem('dev-session'));
    expect(devSession).toBeTruthy();
  });

  test('Protected content should not be visible without server-side auth', async ({ page }) => {
    // Go to courses page
    await page.goto('/courses');

    // Should be on login page
    await page.waitForURL(/\/login/);

    // Verify no course content is leaked in the page
    const pageContent = await page.content();
    expect(pageContent).not.toContain('VWC Engineering Verticals');
    expect(pageContent).not.toContain('Software Engineering');
    expect(pageContent).not.toContain('Data Engineering');
  });
});

test.describe('Public Routes - No Auth Required', () => {

  test('Homepage is publicly accessible', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('About Us page is publicly accessible', async ({ page }) => {
    const response = await page.goto('/about-us');
    expect(response?.status()).toBe(200);
  });

  test('Login page is publicly accessible', async ({ page }) => {
    const response = await page.goto('/login');
    expect(response?.status()).toBe(200);
  });

  test('Apply page is publicly accessible', async ({ page }) => {
    const response = await page.goto('/apply');
    expect(response?.status()).toBe(200);
  });
});

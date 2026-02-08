import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// Load .env.local for local development
dotenv.config({ path: path.resolve(__dirname, ".env.local") });
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: "./tests",
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 1 : 0,
    /* Use half the available CPUs on CI for parallelism */
    workers: process.env.CI ? "50%" : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: "html",
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: "http://localhost:3000",

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: "on-first-retry",
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },

        {
            name: "firefox",
            use: { ...devices["Desktop Firefox"] },
        },

        /* Test against mobile viewports. */
        {
            name: "Mobile Chrome",
            use: { ...devices["Pixel 5"] },
        },

        /* Test against branded browsers. */
        {
            name: "Microsoft Edge",
            use: { ...devices["Desktop Edge"], channel: "msedge" },
        },
        {
            name: "Google Chrome",
            use: { ...devices["Desktop Chrome"], channel: "chrome" },
        },
    ],

    /* Run your local dev server before starting the tests */
    webServer: {
        command: process.env.CI ? "npm run start" : "npm run build && npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
        timeout: process.env.CI ? 30000 : 120000,
        env: {
            NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || "test-secret-for-playwright",
        },
    },
});

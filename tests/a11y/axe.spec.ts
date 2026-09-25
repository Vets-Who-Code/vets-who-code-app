import { AxeBuilder } from "@axe-core/playwright";
import { expect, type Page, test } from "@playwright/test";
import type { Result } from "axe-core";

/**
 * Automated accessibility scan (issue #1225).
 *
 * Every public route below is loaded in a production build and run through axe-core
 * with the WCAG 2.0 / 2.1 A + AA rule set. A violation fails the test with the route,
 * rule id, impact, selector and help URL in the assertion message, so the failure is
 * readable straight from the CI log. Results axe could not decide on (`incomplete`) are
 * logged and attached to the report for manual review; they never fail the run.
 *
 * The suite runs on the `chromium` project only and skips itself elsewhere, so the
 * existing chromium + firefox CI matrix runs it exactly once with no workflow change.
 *
 * Auth-gated routes (/lessons, /profile) are out of scope: there is no login fixture
 * in this suite, and signed out those routes redirect to /login, so scanning them would
 * only scan /login again. Add them once a login fixture exists.
 */

const ROUTES = [
    "/",
    "/apply",
    "/programs",
    "/store",
    "/career-guides",
    "/blogs/blog",
    "/contact-us",
    "/donate",
    "/faq",
    "/about-us",
    "/curriculum",
];

// WCAG 2.0 / 2.1, levels A and AA. Best-practice rules (landmarks, heading order,
// dialog names, ...) are advisory and stay off so CI gates only on conformance.
const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

// `.dark-section::before` (src/assets/css/globals.css) is a 2%-opacity grain overlay at
// z-index 9999 covering every dark section. axe cannot measure text underneath it, so
// without this every node in a dark section lands in `incomplete` instead of being
// checked for contrast.
const HIDE_GRAIN_OVERLAY = ".dark-section::before { display: none !important; }";

// Below-fold sections enter with motion's `whileInView` from `opacity: 0`
// (src/utils/variants.ts), which axe reads as invisible. Scroll the page so every
// section has been in view once. Scrolling back to the top is safe because every
// `whileInView` in src passes `viewport={{ once: true }}`, so nothing reverts.
// Each step jumps (html has `scroll-behavior: smooth` in globals.css, which would
// animate past sections) and waits for two rendered frames, so IntersectionObserver
// sees every position even when the page is busy.
async function revealWhileInViewSections(page: Page): Promise<void> {
    await page.evaluate(async () => {
        const jump = (top: number) => window.scrollTo({ top, behavior: "instant" });
        const settle = () =>
            new Promise((resolve) =>
                requestAnimationFrame(() => requestAnimationFrame(() => setTimeout(resolve, 100)))
            );
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight) {
            jump(y);
            await settle();
        }
        jump(document.body.scrollHeight);
        await settle();
        jump(0);
    });
    // The onscreen tween is 0.5 s.
    await page.waitForTimeout(600);
}

function format(route: string, results: Result[]): string {
    return results
        .map((result) => {
            const header = `${route}  [${result.impact ?? "n/a"}] ${result.id} — ${result.help} (${result.helpUrl})`;
            const nodes = result.nodes.map(
                (node) =>
                    `    ${node.target.join(" ")}\n      ${(node.failureSummary ?? "").replace(/\n/g, "\n      ")}`
            );
            return [header, ...nodes].join("\n");
        })
        .join("\n\n");
}

test.describe("Accessibility (axe)", () => {
    // /career-guides ships a large static payload, and the scroll pass adds time on
    // every route.
    test.describe.configure({ timeout: 60000 });

    test.beforeEach(() => {
        test.skip(
            test.info().project.name !== "chromium",
            "axe runs once, on the chromium project"
        );
    });

    for (const route of ROUTES) {
        test(`${route} has no WCAG A/AA violations`, async ({ page }) => {
            await page.goto(route);
            await page.addStyleTag({ content: HIDE_GRAIN_OVERLAY });
            await revealWhileInViewSections(page);

            // axe's WCAG tags do not count headings; this guards the one-h1-per-page rule.
            await expect(page.locator("h1")).toHaveCount(1);

            const results = await new AxeBuilder({ page })
                .withTags(TAGS)
                // The Donorbox embed on /donate is cross-origin third-party markup we
                // cannot fix, and injecting into it is a flake source.
                .exclude('iframe[name="vwc-donorbox"]')
                .analyze();

            if (results.incomplete.length > 0) {
                const summary = results.incomplete
                    .map((r) => `${route}  incomplete ${r.id} (${r.nodes.length} nodes)`)
                    .join("\n");
                console.log(`axe needs manual review (not failing):\n${summary}`);
                await test.info().attach(`axe-incomplete ${route}`, {
                    body: JSON.stringify(results.incomplete, null, 2),
                    contentType: "application/json",
                });
            }

            expect(
                results.violations.map((v) => v.id),
                format(route, results.violations)
            ).toEqual([]);
        });
    }
});

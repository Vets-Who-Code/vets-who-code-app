import { expect, test } from "@playwright/test";

/**
 * Interactive lesson engine (/learn/[slug]).
 *
 * Drives the real flow: the page auto-runs the learner's code in a sandboxed
 * iframe and reports pass/fail. Test 1 confirms the starter fails; test 2 seeds
 * the reference solution into localStorage (the same SafeStorage envelope the app
 * writes on every edit) and confirms it passes — the way a returning learner's
 * saved work rehydrates.
 *
 * Solution mirrors src/data/interactive-lessons/module-05/js-render-table-rows.ts
 * (solutionFiles). If that lesson changes, update this string.
 */
const LESSON = "js-render-table-rows";
const STORAGE_KEY = `interactive-lesson:${LESSON}:index.js`;
const SOLUTION_JS = `const foods = [
  { name: "Eggs", calories: 155, protein: 13 },
  { name: "Chicken", calories: 165, protein: 31 },
  { name: "Rice", calories: 206, protein: 4 },
];
const tbody = document.getElementById("rows");
for (const food of foods) {
  const tr = document.createElement("tr");
  for (const value of [food.name, food.calories, food.protein]) {
    const td = document.createElement("td");
    td.textContent = String(value);
    tr.appendChild(td);
  }
  tbody.appendChild(tr);
}`;

test.describe("Interactive lesson", () => {
    test("the catalog lists lessons grouped by module", async ({ page }) => {
        await page.goto("/learn");
        await expect(page.getByRole("heading", { name: "Learn by Building" })).toBeVisible();
        await expect(
            page.getByRole("link", { name: /Render Table Rows from an Array/i })
        ).toBeVisible();
    });

    test("starter code fails the tests on auto-run", async ({ page }) => {
        await page.goto(`/learn/${LESSON}`);
        // Auto-run executes the starter, which renders no rows -> all tests fail.
        await expect(page.getByText("0 / 4 tests passing")).toBeVisible({ timeout: 20000 });
    });

    test("the reference solution passes all tests", async ({ page }) => {
        await page.addInitScript(
            ({ key, code }) => {
                window.localStorage.setItem(
                    key,
                    JSON.stringify({ value: code, expiry: null, timestamp: Date.now() })
                );
            },
            { key: STORAGE_KEY, code: SOLUTION_JS }
        );

        await page.goto(`/learn/${LESSON}`);
        await expect(page.getByText("4 / 4 tests passing")).toBeVisible({ timeout: 20000 });
    });
});

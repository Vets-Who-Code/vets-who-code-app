import { expect, type Page, type Request, test } from "@playwright/test";

/**
 * The Apply journey: all five steps of /apply, then the submission. POST /api/apply is fulfilled
 * in the browser, so the request never reaches the API route or the Slack webhook behind it.
 */

const APPLICATION = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    city: "Nashville",
    state: "Tennessee",
    zipCode: "37203",
    country: "United States",
    branchOfService: "Army",
    yearJoined: "2010",
    yearSeparated: "2015",
    previousCourses: "JavaScript Fundamentals",
    linkedInAccountName: "https://linkedin.com/in/jane-doe",
    githubAccountName: "https://github.com/jane-doe",
    preworkLink: "https://jane-doe.github.io/prework",
    preworkRepo: "https://github.com/jane-doe/prework",
};

const confirmation = (page: Page) => page.getByRole("heading", { name: "Application Submitted!" });

const fillApplication = async (page: Page) => {
    await page.goto("/apply");
    const next = page.getByRole("button", { name: "Next →" });

    await page.getByLabel("First Name").fill(APPLICATION.firstName);
    await page.getByLabel("Last Name").fill(APPLICATION.lastName);
    await page.getByLabel("Email Address").fill(APPLICATION.email);
    // Retry the first click: one that lands before hydration attaches the handler is lost. Click
    // only while still on step 1, so a slow advance never gets an extra click on step 2.
    await expect(async () => {
        if (await page.getByText("Step 1 of 5").isVisible()) {
            await next.click();
        }
        await expect(page.getByText("Step 2 of 5")).toBeVisible({ timeout: 1000 });
    }).toPass();

    await expect(page.getByRole("heading", { name: "Location Details" })).toBeVisible();
    await page.getByLabel("City").fill(APPLICATION.city);
    await page.getByLabel("State/Province").fill(APPLICATION.state);
    await page.getByLabel("Zip/Postal Code").fill(APPLICATION.zipCode);
    await page.getByLabel("Country").fill(APPLICATION.country);
    await next.click();

    await expect(page.getByRole("heading", { name: "Military Background" })).toBeVisible();
    await page.getByLabel("Branch of Service").fill(APPLICATION.branchOfService);
    await page.getByLabel("Year Joined").fill(APPLICATION.yearJoined);
    await page.getByLabel("Year Separated").fill(APPLICATION.yearSeparated);
    await next.click();

    await expect(page.getByRole("heading", { name: "Education History" })).toBeVisible();
    // The native checkbox is visually hidden, so click its label as a user would.
    await page.getByText("previously attended").click();
    await expect(page.getByLabel("previously attended")).toBeChecked();
    await page.getByLabel("List previous courses").fill(APPLICATION.previousCourses);
    await next.click();

    await expect(page.getByRole("heading", { name: "Technical Profiles" })).toBeVisible();
    await page.getByLabel("LinkedIn Profile URL").fill(APPLICATION.linkedInAccountName);
    await page.getByLabel("GitHub Profile URL").fill(APPLICATION.githubAccountName);
    await page.getByLabel("Prework Live Link").fill(APPLICATION.preworkLink);
    await page.getByLabel("Prework Repository URL").fill(APPLICATION.preworkRepo);
};

test.describe("Apply journey", () => {
    // html has scroll-behavior: smooth, so Firefox can still be scrolling a target into view when
    // the click lands and the click misses. Reduced motion turns that (and CSS transitions) off.
    test.use({ reducedMotion: "reduce" });

    test("submits all five steps and shows the confirmation", async ({ page }) => {
        const requests: Request[] = [];
        await page.route("**/api/apply", async (route) => {
            requests.push(route.request());
            await route.fulfill({ json: { message: "SUCCESS" } });
        });

        await fillApplication(page);
        await page.getByRole("button", { name: "Submit Application" }).click();

        await expect(confirmation(page)).toBeVisible();
        await expect(page.getByText("Thank you for your application!")).toBeVisible();

        expect(requests).toHaveLength(1);
        expect(requests[0].method()).toBe("POST");
        // The form sends the numeric fields as numbers and the unchecked box as false.
        expect(requests[0].postDataJSON()).toEqual({
            ...APPLICATION,
            zipCode: 37203,
            yearJoined: 2010,
            yearSeparated: 2015,
            hasAttendedPreviousCourse: true,
            willAttendAnotherCourse: false,
        });
    });

    test("shows the error and stays usable when the submission fails", async ({ page }) => {
        let calls = 0;
        await page.route("**/api/apply", async (route) => {
            calls += 1;
            await route.fulfill(
                calls === 1
                    ? { status: 500, json: { message: "Failed to post to #apply channel" } }
                    : { json: { message: "SUCCESS" } }
            );
        });

        await fillApplication(page);
        const submit = page.getByRole("button", { name: "Submit Application" });
        await submit.click();

        await expect(
            page.getByRole("alert").filter({ hasText: "Failed to submit the form" })
        ).toHaveText("Failed to submit the form. Please try again later.");
        await expect(confirmation(page)).toHaveCount(0);
        await expect(submit).toBeEnabled();
        await expect(page.getByLabel("Prework Repository URL")).toHaveValue(
            APPLICATION.preworkRepo
        );

        await submit.click();
        await expect(confirmation(page)).toBeVisible();
        expect(calls).toBe(2);
    });
});

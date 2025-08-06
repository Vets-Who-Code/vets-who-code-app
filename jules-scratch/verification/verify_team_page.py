from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the team page
    page.goto("http://localhost:3000/team")
    page.screenshot(path="jules-scratch/verification/team-page.png")

    # Click on the first team member
    page.locator('a[href="/team/jerome-hardaway"]').click()
    page.wait_for_url("http://localhost:3000/team/jerome-hardaway")
    page.screenshot(path="jules-scratch/verification/jerome-hardaway-page.png")

    context.close()
    browser.close()

with sync_playwright() as playwright:
    run(playwright)

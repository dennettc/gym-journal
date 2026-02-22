from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    # Go to Dashboard
    print("Navigating to Dashboard...")
    page.goto("http://localhost:5173/")
    page.wait_for_selector("text=Ski Journal")
    page.screenshot(path="verification/dashboard_initial.png")
    print("Initial Dashboard screenshot taken.")

    # Go to Settings
    print("Navigating to Settings...")
    page.click("text=Settings")
    page.wait_for_selector("text=Training Phase")

    # Change Phase to 2
    print("Changing Phase to 2...")
    page.click("input[value=\"2\"]")

    # Set TJT Max
    print("Setting TJT Max to 50...")
    page.fill("input[name=\"tjtMax\"]", "50")

    page.screenshot(path="verification/settings_updated.png")
    print("Settings updated screenshot taken.")

    # Go back to Dashboard
    print("Returning to Dashboard...")
    page.click("text=Dashboard")
    page.wait_for_selector("text=Phase 2")

    # Verify Phase 2 content
    content = page.content()
    if "Utilization" in content:
        print("Phase 2 description found.")
    else:
        print("Phase 2 description NOT found.")

    # Verify TJT Target (50 * 0.25 = 12.5 -> 13)
    if "13" in content:
        print("TJT Target 13 found.")
    else:
        print("TJT Target 13 NOT found.")

    page.screenshot(path="verification/dashboard_phase2.png")
    print("Dashboard Phase 2 screenshot taken.")

    # Interact with Leg Blasters
    print("Interacting with Leg Blasters...")
    # Click "Full"
    page.click("text=Full")
    # Click "Start Rest"
    page.click("text=Start Rest")
    page.wait_for_timeout(1000) # Wait a sec for timer to update

    page.screenshot(path="verification/leg_blasters.png")
    print("Leg Blasters screenshot taken.")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)

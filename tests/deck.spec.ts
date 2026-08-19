import { test, expect } from "@playwright/test";
import path from "path";

const basePath = path.resolve(__dirname, "..");

test.describe("Miles Strategy Deck in slides/ directory", () => {
    test("verifies root index.html redirects to slides/slide-1-welcome.html", async ({ page }) => {
        await page.goto(`file://${basePath}/index.html`);
        await expect(page).toHaveURL(/slides\/slide-1-welcome\.html/);
        await expect(page.locator("h1")).toContainText("Bobo & Bubba Miles Strategy!");
        await expect(page.locator(".slide-counter-badge")).toHaveText("Slide 1 of 11");

        // Check active bullet
        const activeDot = page.locator(".slide-dot.active");
        await expect(activeDot).toHaveAttribute("aria-label", /1\. Welcome/);

        // Click Start Tour
        await page.locator(".start-tour-btn").click();
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);
    });

    test("verifies portfolio cards navigate to individual card slides in slides/", async ({ page }) => {
        await page.goto(`file://${basePath}/slides/slide-2-our-card-portfolio.html`);
        await expect(page.locator("h2")).toContainText("Our Card Portfolio");

        // Click Citi Rewards card
        await page.locator(".port-card", { hasText: "Citi Rewards" }).click();
        await expect(page).toHaveURL(/slides\/slide-3-citi-rewards\.html/);
        await expect(page.locator("h2")).toContainText("Citi Rewards Card");

        // Click Back to Portfolio
        await page.locator(".back-portfolio-btn").click();
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);

        // Click Strategy Cheatsheet feature link
        await page.locator(".port-feature-link", { hasText: "Strategy Cheatsheet" }).click();
        await expect(page).toHaveURL(/slides\/slide-11-strategy-cheatsheet\.html/);
        await expect(page.locator("h2")).toContainText("Strategy Cheatsheet");
    });

    test("verifies clickable slide bullets with hover tooltips jump to slides in slides/", async ({ page }) => {
        await page.goto(`file://${basePath}/slides/slide-1-welcome.html`);

        // Check tooltip on bullet hover
        const dot5Wrap = page.locator(".slide-dot-wrap").nth(4); // 5th slide (UOB PPV)
        await dot5Wrap.hover();
        const tooltip = dot5Wrap.locator(".slide-dot-tooltip");
        await expect(tooltip).toHaveText("5. UOB Preferred Visa 📱");

        // Click 5th bullet to skip directly to UOB PPV slide
        await dot5Wrap.locator(".slide-dot").click();
        await expect(page).toHaveURL(/slides\/slide-5-uob-preferred-platinum-visa\.html/);
        await expect(page.locator("h2")).toContainText("UOB Preferred Platinum Visa");

        // Click 10th bullet (HeyMax Guide)
        const dot10Wrap = page.locator(".slide-dot-wrap").nth(9);
        await dot10Wrap.locator(".slide-dot").click();
        await expect(page).toHaveURL(/slides\/slide-10-heymax-optimization-guide\.html/);
        await expect(page.locator("h2")).toContainText("HeyMax Optimization Guide");
    });

    test("verifies keyboard navigation between slides in slides/", async ({ page }) => {
        await page.goto(`file://${basePath}/slides/slide-1-welcome.html`);
        await page.keyboard.press("ArrowRight");
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);

        await page.keyboard.press("ArrowRight");
        await expect(page).toHaveURL(/slides\/slide-3-citi-rewards\.html/);

        await page.keyboard.press("ArrowLeft");
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);
    });

    test("verifies mobile screen responsiveness and touch swipe navigation", async ({ page }) => {
        // Set mobile viewport (iPhone 14 / modern phone: 390 x 844)
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(`file://${basePath}/slides/slide-1-welcome.html`);

        // Check title slide mobile elements
        await expect(page.locator("h1")).toContainText("Bobo & Bubba Miles Strategy!");
        await expect(page.locator(".slide-counter-badge")).toHaveText("Slide 1 of 11");

        // Check sticky controls bar at bottom
        const controls = page.locator(".controls");
        await expect(controls).toBeVisible();

        // Simulate touch swipe left (swipe to slide 2)
        await page.evaluate(() => {
            const createTouchEvent = (type: string, screenX: number, screenY: number) => {
                const touchObj = {
                    identifier: Date.now(),
                    target: document.body,
                    screenX,
                    screenY,
                    clientX: screenX,
                    clientY: screenY,
                    pageX: screenX,
                    pageY: screenY,
                };
                const event = new CustomEvent(type, { bubbles: true, cancelable: true }) as CustomEvent & {
                    touches: (typeof touchObj)[];
                    changedTouches: (typeof touchObj)[];
                };
                event.touches = type === "touchend" ? [] : [touchObj];
                event.changedTouches = [touchObj];
                return event;
            };

            document.dispatchEvent(createTouchEvent("touchstart", 300, 400));
            setTimeout(() => {
                document.dispatchEvent(createTouchEvent("touchend", 100, 400));
            }, 60);
        });

        // Wait for slide 2 transition
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);
        await expect(page.locator(".slide-counter-badge")).toHaveText("Slide 2 of 11");

        // Verify HeyMax Guide (Slide 10) on mobile
        await page.goto(`file://${basePath}/slides/slide-10-heymax-optimization-guide.html`);
        await expect(page.locator(".heymax-pillars")).toBeVisible();
        await expect(page.locator(".heymax-step-card")).toHaveCount(3);

        // Verify Strategy Cheatsheet (Slide 11) on mobile
        await page.goto(`file://${basePath}/slides/slide-11-strategy-cheatsheet.html`);
        await expect(page.locator(".table-scroll-hint")).toBeVisible();
        await expect(page.locator(".table-container")).toBeVisible();

        // Swiping inside the table container should NOT navigate away from slide 11
        await page.evaluate(() => {
            const tableEl = document.querySelector(".table-container");
            const createTouchEvent = (type: string, screenX: number, screenY: number, target: Element) => {
                const touchObj = {
                    identifier: Date.now(),
                    target,
                    screenX,
                    screenY,
                    clientX: screenX,
                    clientY: screenY,
                    pageX: screenX,
                    pageY: screenY,
                };
                const event = new CustomEvent(type, { bubbles: true, cancelable: true }) as CustomEvent & {
                    touches: (typeof touchObj)[];
                    changedTouches: (typeof touchObj)[];
                };
                event.touches = type === "touchend" ? [] : [touchObj];
                event.changedTouches = [touchObj];
                return event;
            };

            if (tableEl) {
                tableEl.dispatchEvent(createTouchEvent("touchstart", 300, 400, tableEl));
                setTimeout(() => {
                    tableEl.dispatchEvent(createTouchEvent("touchend", 100, 400, tableEl));
                }, 60);
            }
        });

        await page.waitForTimeout(150);
        // Remains on slide 11
        await expect(page).toHaveURL(/slides\/slide-11-strategy-cheatsheet\.html/);
        await expect(page.locator(".slide-counter-badge")).toHaveText("Slide 11 of 11");
    });
});

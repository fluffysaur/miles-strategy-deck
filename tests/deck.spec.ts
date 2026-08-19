import { test, expect } from '@playwright/test';
import path from 'path';

const basePath = path.resolve(__dirname, '..');

test.describe('Miles Strategy Deck in slides/ directory', () => {
    test('verifies root index.html redirects to slides/slide-1-welcome.html', async ({ page }) => {
        await page.goto(`file://${basePath}/index.html`);
        await expect(page).toHaveURL(/slides\/slide-1-welcome\.html/);
        await expect(page.locator('h1')).toContainText('Bobo & Bubba Miles Strategy!');
        await expect(page.locator('.slide-counter-badge')).toHaveText('Slide 1 of 11');
        
        // Check active bullet
        const activeDot = page.locator('.slide-dot.active');
        await expect(activeDot).toHaveAttribute('aria-label', /1\. Welcome/);

        // Click Start Tour
        await page.locator('.start-tour-btn').click();
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);
    });

    test('verifies portfolio cards navigate to individual card slides in slides/', async ({ page }) => {
        await page.goto(`file://${basePath}/slides/slide-2-our-card-portfolio.html`);
        await expect(page.locator('h2')).toContainText('Our Card Portfolio');

        // Click Citi Rewards card
        await page.locator('.port-card', { hasText: 'Citi Rewards' }).click();
        await expect(page).toHaveURL(/slides\/slide-3-citi-rewards\.html/);
        await expect(page.locator('h2')).toContainText('Citi Rewards Card');

        // Click Back to Portfolio
        await page.locator('.back-portfolio-btn').click();
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);

        // Click Strategy Cheatsheet feature link
        await page.locator('.port-feature-link', { hasText: 'Strategy Cheatsheet' }).click();
        await expect(page).toHaveURL(/slides\/slide-11-strategy-cheatsheet\.html/);
        await expect(page.locator('h2')).toContainText('Strategy Cheatsheet');
    });

    test('verifies clickable slide bullets with hover tooltips jump to slides in slides/', async ({ page }) => {
        await page.goto(`file://${basePath}/slides/slide-1-welcome.html`);

        // Check tooltip on bullet hover
        const dot5Wrap = page.locator('.slide-dot-wrap').nth(4); // 5th slide (UOB PPV)
        await dot5Wrap.hover();
        const tooltip = dot5Wrap.locator('.slide-dot-tooltip');
        await expect(tooltip).toHaveText('5. UOB Preferred Visa 📱');

        // Click 5th bullet to skip directly to UOB PPV slide
        await dot5Wrap.locator('.slide-dot').click();
        await expect(page).toHaveURL(/slides\/slide-5-uob-preferred-platinum-visa\.html/);
        await expect(page.locator('h2')).toContainText('UOB Preferred Platinum Visa');

        // Click 10th bullet (HeyMax Guide)
        const dot10Wrap = page.locator('.slide-dot-wrap').nth(9);
        await dot10Wrap.locator('.slide-dot').click();
        await expect(page).toHaveURL(/slides\/slide-10-heymax-optimization-guide\.html/);
        await expect(page.locator('h2')).toContainText('HeyMax Optimization Guide');
    });

    test('verifies keyboard navigation between slides in slides/', async ({ page }) => {
        await page.goto(`file://${basePath}/slides/slide-1-welcome.html`);
        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);

        await page.keyboard.press('ArrowRight');
        await expect(page).toHaveURL(/slides\/slide-3-citi-rewards\.html/);

        await page.keyboard.press('ArrowLeft');
        await expect(page).toHaveURL(/slides\/slide-2-our-card-portfolio\.html/);
    });
});

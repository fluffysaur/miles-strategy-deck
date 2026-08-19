import { test, expect } from '@playwright/test';

test.describe('Bobo & Bubba Miles Strategy Web App & Deck Mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders web app header and main card finder by default', async ({ page }) => {
    await expect(page.locator('.brand-title')).toContainText('Bobo & Bubba Miles Strategy');
    await expect(page.locator('.search-input')).toBeVisible();
    await expect(page.locator('.ribbon-stat-card').first()).toBeVisible();

    // Verify search functionality
    const searchInput = page.locator('.search-input');
    await searchInput.fill('Uniqlo');
    await expect(page.locator('.merchant-card')).toHaveCount(1);
    await expect(page.locator('.merchant-title')).toContainText('Uniqlo');
    await expect(page.locator('.rec-card-name')).toContainText('UOB PPV');
  });

  test('shows SMART$ warning when searching restricted merchants like Giant / Cold Storage', async ({ page }) => {
    const searchInput = page.locator('.search-input');
    await searchInput.fill('Cold Storage');
    await expect(page.locator('.merchant-card')).toHaveCount(1);
    await expect(page.locator('.merchant-warning')).toBeVisible();
    await expect(page.locator('.merchant-warning')).toContainText('SMART$ merchant');
  });

  test('navigates to Cheatsheet Matrix and filters categories with proper category styling', async ({ page }) => {
    await page.locator('button', { hasText: 'Cheatsheet' }).first().click();
    await expect(page.locator('.table-title')).toContainText('Strategy Decision Matrix');
    await expect(page.locator('.matrix-desktop-table')).toBeVisible();
    await expect(page.locator('.app-table tbody tr').first()).toBeVisible();

    // Verify Spend Category column styling elements
    const firstCategory = page.locator('.app-table tbody tr .td-category').first();
    await expect(firstCategory).toBeVisible();
    await expect(firstCategory.locator('.td-icon-box')).toBeVisible();

    // Filter by dining
    await page.locator('button', { hasText: 'Dining' }).first().click();
    await expect(page.locator('.app-table tbody tr')).not.toHaveCount(0);

    // Verify separate links for multi-primary card row (e.g. Restaurants has UOB Lady's and HSBC Revo)
    const diningRow = page.locator('.app-table tbody tr', { hasText: 'Restaurants' });
    const ladysBtn = diningRow.locator('button', { hasText: "UOB Lady's" });
    const revoBtn = diningRow.locator('button', { hasText: 'HSBC Revo' });

    await expect(ladysBtn).toBeVisible();
    await expect(revoBtn).toBeVisible();

    // Click HSBC Revo separate link and verify its modal opens
    await revoBtn.click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(page.locator('.modal-content h2')).toContainText('HSBC Revolution');
    await page.locator('.modal-close-btn').click();
    await expect(page.locator('.modal-content')).not.toBeVisible();

    // Click UOB Lady's separate link and verify its modal opens
    await ladysBtn.click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(page.locator('.modal-content h2')).toContainText("UOB Lady's");
    await page.locator('.modal-close-btn').click();
    await expect(page.locator('.modal-content')).not.toBeVisible();
  });

  test('opens Card Wallet and triggers Card Detail modal', async ({ page }) => {
    await page.locator('button', { hasText: 'Card Wallet' }).first().click();
    await expect(page.locator('h2')).toContainText('Our 7-Card Portfolio');

    // Click Citi Rewards
    await page.locator('.wallet-card', { hasText: 'Citi Rewards' }).click();
    await expect(page.locator('.modal-content')).toBeVisible();
    await expect(page.locator('.modal-content h2')).toContainText('Citi Rewards Card');
    await expect(page.locator('.modal-content')).toContainText('Instarem Amaze');

    // Close modal
    await page.locator('.modal-close-btn').click();
    await expect(page.locator('.modal-content')).not.toBeVisible();
  });

  test('updates spend and calculates progress in Cap Tracker', async ({ page }) => {
    await page.locator('button', { hasText: 'Cap Tracker' }).first().click();
    await expect(page.locator('h2')).toContainText('Bobo & Bubba Monthly Cap Tracker');

    // Click quick add +$100 on Bobo PPV
    const boboCard = page.locator('.cap-card', { hasText: 'Bobo UOB PPV' });
    await boboCard.locator('button', { hasText: '+$100' }).click();
    await expect(boboCard).toContainText('$100.00');

    // Reload page and verify localStorage persistence
    await page.reload();
    await page.locator('button', { hasText: 'Cap Tracker' }).first().click();
    const boboCardReloaded = page.locator('.cap-card', { hasText: 'Bobo UOB PPV' });
    await expect(boboCardReloaded).toContainText('$100.00');
  });

  test('switches into Presentation Deck Mode and navigates slides via controls and keyboard', async ({ page }) => {
    await page.locator('button', { hasText: 'Deck Mode' }).click();
    await expect(page.locator('.deck-view-container')).toBeVisible();
    await expect(page.locator('h1')).toContainText('Bobo & Bubba Miles Strategy!');
    await expect(page.locator('.slide-counter-badge')).toHaveText('Slide 1 of 11');

    // Click Next
    await page.locator('.controls .nav-btn', { hasText: 'Next' }).click();
    await expect(page.locator('.slide-counter-badge')).toHaveText('Slide 2 of 11');
    await expect(page.locator('h2')).toContainText('Our Card Portfolio');

    // Keyboard ArrowRight
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.slide-counter-badge')).toHaveText('Slide 3 of 11');
    await expect(page.locator('h2')).toContainText('Citi Rewards Card');

    // Click bullet dot to skip to slide 11 (Cheatsheet)
    const dot11 = page.locator('.slide-dot-wrap').nth(10).locator('.slide-dot');
    await dot11.click();
    await expect(page.locator('.slide-counter-badge')).toHaveText('Slide 11 of 11');
    await expect(page.locator('h2')).toContainText('Strategy Cheatsheet');

    // Exit deck mode
    await page.locator('.exit-deck-btn').first().click();
    await expect(page.locator('.deck-view-container')).not.toBeVisible();
    await expect(page.locator('.search-input')).toBeVisible();
  });

  test('responsive mobile layout with bottom navigation', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');

    const bottomNav = page.locator('.bottom-nav');
    await expect(bottomNav).toBeVisible();

    // Tap Caps tab on bottom nav
    await bottomNav.locator('.bottom-nav-item', { hasText: 'Caps' }).click();
    await expect(page.locator('h2')).toContainText('Bobo & Bubba Monthly Cap Tracker');

    // Tap HeyMax tab
    await bottomNav.locator('.bottom-nav-item', { hasText: 'HeyMax' }).click();
    await expect(page.locator('h2')).toContainText('HeyMax Max Miles Optimization');
  });
});

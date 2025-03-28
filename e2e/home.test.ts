import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should display welcome title', async ({ page }) => {
    const title = page.locator('h1');
    await expect(title).toBeVisible();
  });

  test('should display favorites section', async ({ page }) => {
    const favoritesSection = page.locator('[data-test="favorites-albums-section"]');
    await expect(favoritesSection).toBeVisible();

    const sectionTitle = favoritesSection.locator('.home-page-section__title');
    await expect(sectionTitle).toBeVisible();

    const viewAllButton = favoritesSection.locator('a');
    await expect(viewAllButton).toHaveAttribute('href', '/favorites');
  });

  test('should display top albums section', async ({ page }) => {
    const topAlbumsSection = page.locator('[data-test="top-albums-section"]');
    await expect(topAlbumsSection).toBeVisible();

    const sectionTitle = topAlbumsSection.locator('.home-page-section__title');
    await expect(sectionTitle).toBeVisible();

    const viewAllButton = topAlbumsSection.locator('a');
    await expect(viewAllButton).toHaveAttribute('href', '/top-albums');
  });

  test('should display top albums list with limited items', async ({ page }) => {
    const topAlbumsSection = page.locator('[data-test="top-albums-section"]');
    await expect(topAlbumsSection.locator('.album-tile')).toHaveCount(10);
  });

  test('should load albums without errors', async ({ page }) => {
    const topAlbumsSection = page.locator('[data-test="top-albums-section"]');

    await expect(topAlbumsSection.locator('.album-tile')).toHaveCount(10);
    await expect(topAlbumsSection.locator('.album-tile__title').first()).toBeVisible();
    await expect(topAlbumsSection.locator('.album-tile__artist').first()).toBeVisible();
  });

  test('should show empty state for favorites when no albums are saved', async ({ page }) => {
    const favoritesSection = page.locator('[data-test="favorites-albums-section"]');

    if ((await favoritesSection.locator('.album-tile').count()) === 0) {
      await expect(favoritesSection.locator('.album-tiles-list__empty')).toBeVisible();
      await expect(favoritesSection.locator('.album-tiles-list__empty-text')).toBeVisible();
    } else {
      await expect(favoritesSection.locator('.album-tile')).toHaveCount(0);
    }
  });
});

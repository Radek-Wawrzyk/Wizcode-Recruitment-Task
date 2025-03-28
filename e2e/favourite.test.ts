import { test, expect } from '@playwright/test';

test.describe('Favorite Albums', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/top-albums');
    await page.waitForLoadState('networkidle');

    const albums = page.locator('.album-tile');

    await albums.nth(0).locator('.album-tile__favorite-button').click();
    await page.waitForTimeout(400);

    await albums.nth(1).locator('.album-tile__favorite-button').click();
    await page.waitForTimeout(400);
    await page.goto('/favorites');
  });

  test('should display favorite albums list', async ({ page }) => {
    await page.goto('/favorites');
    await expect(page.locator('.album-tiles-list')).toBeVisible();
    await expect(page.locator('.album-tile')).toHaveCount(2);
  });

  test('should remove album from favorites', async ({ page }) => {
    await page.goto('/favorites');
    await expect(page.locator('.album-tiles-list')).toBeVisible();
    const initialCount = await page.locator('.album-tile').count();
    expect(initialCount).toBe(2);

    const firstAlbum = page.locator('.album-tile').first();
    const albumTitle = await firstAlbum.locator('.album-tile__title').textContent();

    await firstAlbum.locator('.album-tile__favorite-button').click();
    await page.waitForTimeout(400);

    const newCount = await page.locator('.album-tile').count();
    expect(newCount).toBe(initialCount - 1);

    const albumsTitles = await page.locator('.album-tile__title').allTextContents();
    expect(albumsTitles).not.toContain(albumTitle);
  });

  test('should display empty state when all favorites are removed', async ({ page }) => {
    await page.goto('/favorites');
    await page.waitForTimeout(600);

    let favoriteButtons = page.locator('.album-tile__favorite-button');
    const count = await favoriteButtons.count();

    expect(count).toBe(2);

    while ((await favoriteButtons.count()) > 0) {
      await favoriteButtons.first().click();
      await page.waitForTimeout(1000);
      favoriteButtons = page.locator('.album-tile__favorite-button');
    }

    await expect(page.locator('.album-tiles-list__empty')).toBeVisible();
    await expect(page.locator('.album-tiles-list__empty-text')).toBeVisible();
  });

  test('should have the same favorites on Home page', async ({ page }) => {
    const favoriteTitles = await page.locator('.album-tile__title').allTextContents();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const homePageFavorites = page.locator('[data-test="favorites-albums-section"]');

    for (const title of favoriteTitles) {
      await expect(homePageFavorites).toContainText(title);
    }
  });
});

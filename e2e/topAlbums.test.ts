import { test, expect } from '@playwright/test';

test.describe('Top Albums Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/top-albums');
    await page.waitForLoadState('networkidle');
  });

  test('should display list of albums', async ({ page }) => {
    await expect(page.locator('.album-tiles-list')).toBeVisible();
    await expect(page.locator('.album-tile__title').first()).toBeVisible();
  });

  test('should filter albums by search text', async ({ page }) => {
    const searchInput = page.locator('.base-input__field');
    const albumCount = await page.locator('.album-tile').count();

    await expect(searchInput).toBeVisible();
    await searchInput.fill('Mumford');
    await page.waitForTimeout(1000);

    const filteredAlbumsCount = await page.locator('.album-tile').count();

    if (filteredAlbumsCount > 0) {
      const albumsContent = await page.locator('.album-tile').allTextContents();
      const hasMatchingAlbum = albumsContent.some((content) =>
        content.toLowerCase().includes('mumford'),
      );

      expect(hasMatchingAlbum).toBeTruthy();
    } else {
      await expect(page.locator('.album-tiles-list__empty')).toBeVisible();
    }

    await searchInput.clear();
    await page.waitForTimeout(1000);

    const resetAlbumsCount = await page.locator('.album-tile').count();
    expect(resetAlbumsCount).toBe(albumCount);
  });

  test('should filter albums by category', async ({ page }) => {
    const categorySelect = page.locator('.base-multi-select__selected');
    await expect(categorySelect).toBeVisible();
    await categorySelect.click();

    await expect(page.locator('.base-multi-select__options')).toBeVisible();

    const firstCategory = page.locator('.base-multi-select__option').first();
    await firstCategory.click();

    await page.waitForTimeout(1000);
    const albumsCount = await page.locator('.album-tile').count();

    if (albumsCount > 0) {
      const albumsVisible = await page.locator('.album-tile').isVisible();
      expect(albumsVisible).toBeTruthy();
    } else {
      await expect(page.locator('.album-tiles-list__empty')).toBeVisible();
    }

    await page.locator('body').click();
  });

  test('should add album to favorites', async ({ page }) => {
    const notFavoriteAlbum = page.locator('.album-tile:not(.album-tile--favorite)').first();
    const albumTitle = await notFavoriteAlbum.locator('.album-tile__title').textContent();

    await notFavoriteAlbum.locator('.album-tile__favorite-button').click();
    await page.waitForTimeout(200);

    await page.goto('/favorites');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.album-tiles-list')).toBeVisible();
    await expect(page.locator('.album-tiles-list')).toContainText(albumTitle || '');
  });

  test('should display album details correctly', async ({ page }) => {
    const firstAlbum = page.locator('.album-tile').first();

    await expect(firstAlbum.locator('.album-tile__title')).toBeVisible();
    await expect(firstAlbum.locator('.album-tile__artist')).toBeVisible();
    await expect(firstAlbum.locator('.album-tile__image')).toBeVisible();

    const hasPrice = await firstAlbum.locator('.album-tile__price').isVisible();
    const hasTracksNumber = await firstAlbum.locator('.album-tile__tracks-number').isVisible();

    expect(hasPrice || hasTracksNumber).toBeTruthy();
  });

  test('should handle empty search results', async ({ page }) => {
    const searchInput = page.locator('.base-input__field');
    await searchInput.fill('xyznonexistentalbumqwerty');

    await page.waitForTimeout(400);
    await expect(page.locator('.album-tiles-list__empty')).toBeVisible();
  });

  test('should load album images lazily', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const loadedImages = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('.album-tile__image-inner'));
      return images.some((img) => (img as HTMLImageElement).src !== '');
    });

    expect(loadedImages).toBeTruthy();
  });
});

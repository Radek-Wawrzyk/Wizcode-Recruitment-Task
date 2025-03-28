import { test, expect } from '@playwright/test';

test.describe('Layout and Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should toggle sidebar on mobile view', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);

    await expect(page.locator('.app-sidebar')).toBeVisible();
    await expect(page.locator('.app-sidebar')).not.toHaveClass('app-sidebar--is-active');

    const menuButton = page.locator('.app-top-navigation__button');
    await menuButton.click();

    await expect(page.locator('.app-sidebar')).toHaveClass('app-sidebar app-sidebar--is-active');

    await expect(page.locator('.app-sidebar-overlay')).toHaveClass(
      'app-sidebar-overlay app-sidebar-overlay--is-active',
    );

    await page.locator('.app-sidebar-header__button').click();

    await expect(page.locator('.app-sidebar')).not.toHaveClass('app-sidebar--is-active');
    await expect(page.locator('.app-sidebar-overlay')).not.toHaveClass(
      'app-sidebar-overlay app-sidebar-overlay--is-active',
    );
  });

  test('should close sidebar when clicking overlay', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(200);

    const menuButton = page.locator('.app-top-navigation__button');
    await menuButton.click();

    await expect(page.locator('.app-sidebar')).toHaveClass('app-sidebar app-sidebar--is-active');
    await page.locator('.app-sidebar-overlay').click();

    await expect(page.locator('.app-sidebar')).not.toHaveClass('app-sidebar--is-active');
  });

  test('should toggle dark mode', async ({ page }) => {
    const darkModeSwitch = page.locator('.app-theme-switcher');
    await expect(darkModeSwitch).toBeVisible();

    await darkModeSwitch.click();
    await page.waitForTimeout(600);

    const isDarkMode = await page.evaluate(() =>
      document.documentElement.classList.contains('dark-mode'),
    );

    expect(isDarkMode).toBe(true);

    await darkModeSwitch.click();
    await page.waitForTimeout(600);

    const isLightMode = await page.evaluate(() =>
      document.documentElement.classList.contains('light-mode'),
    );

    expect(isLightMode).toBe(true);
  });
});

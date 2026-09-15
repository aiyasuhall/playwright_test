import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Login Negative Cases', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // TC-1: Login with Locked Out User
  test('TC-1: locked out user sees error and stays on login page', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Sorry, this user has been locked out.'
    );
  });

  // TC-2: Login with Empty Credentials
  test('TC-2: empty credentials show required field errors', async ({ page }) => {
    // Step 3: click with both fields blank -> "Username is required"
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');

    // Step 5-6: fill username only, leave password blank -> "Password is required"
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  // TC-3: Login with Invalid Password
  test('TC-3: invalid password shows mismatch error and stays on login page', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match any user in this service'
    );
  });
});

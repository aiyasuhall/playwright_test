import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com');
  });

  test('login thành công với standard_user', async ({ page }) => {
    // Nhập thông tin đăng nhập
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Sau khi login sẽ chuyển tới trang inventory
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Kiểm tra trang inventory đã hiển thị đúng
    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('[data-test="inventory-container"]')).toBeVisible();
  });

  test('login thất bại với sai mật khẩu', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('wrong_password');
    await page.locator('[data-test="login-button"]').click();

    // Vẫn ở trang login và hiển thị thông báo lỗi
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="error"]')).toContainText(
      'Username and password do not match any user in this service'
    );
  });
});

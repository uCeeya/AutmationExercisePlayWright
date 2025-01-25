import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://automationexercise.com/');
});
test('Verify homepage loads correctly', async ({ page }) => {
  await expect(page).toHaveTitle('Automation Exercise');
});

test('Check navigation to Products page', async ({ page }) => {
  await page.click('a[href="/products"]');
  await expect(page).toHaveURL(/.*\/products/);
  await expect(page.locator('h2.title')).toHaveText('All Products');
});


test('Search for a product', async ({ page }) => {
  await page.click('a[href="/products"]');
  await page.fill('input[id="search_product"]', 'Blue Top');
  await page.click('button[id="submit_search"]');
  await expect(page.locator('.productinfo')).toContainText('Blue Top');
});

test('User login with invalid credentials - Case1', async ({ page }) => {
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="login-email"]', 'invalid@example.com');
  await page.fill('input[data-qa="login-password"]', 'wrongpassword');
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('.login-form p')).toHaveText('Your email or password is incorrect!');
});

test('Successful user registration', async ({ page }) => {
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-name"]', 'Test User');
  await page.fill('input[data-qa="signup-email"]', `test${Date.now()}@example.com`);
  await page.click('button[data-qa="signup-button"]');
  await expect(page.locator('b').filter({ hasText: 'Enter Account Information' })).toBeVisible();

});
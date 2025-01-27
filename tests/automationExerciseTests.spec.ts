import { test, expect } from '@playwright/test';

import { faker } from '@faker-js/faker';

// This launches the browser and navigates to the homepage before each test
test.beforeEach(async ({ page }) => {
  await page.goto('https://automationexercise.com/');
});

// This test verifies that the homepage loads correctly
test('Verify homepage loads correctly', async ({ page }) => {
  await expect(page).toHaveTitle('Automation Exercise');
});

// This test verifies that the products page loads correctly and all products are displayed
test('Check navigation to Products page', async ({ page }) => {
  await page.click('a[href="/products"]');
  await expect(page).toHaveURL(/.*\/products/);
  await expect(page.locator('h2.title')).toHaveText('All Products');
});

// This test verifies that the user is able to search for a product
test('Search for a product', async ({ page }) => {
  await page.click('a[href="/products"]');
  await page.fill('input[id="search_product"]', 'Blue Top');
  await page.click('button[id="submit_search"]');
  await expect(page.locator('.productinfo')).toContainText('Blue Top');
});

// This test checks the user login with valid credentials and valid message is displayed
test('User login with invalid credentials - Case1', async ({ page }) => {
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="login-email"]', 'invalid@example.com');
  await page.fill('input[data-qa="login-password"]', 'wrongpassword');
  await page.click('button[data-qa="login-button"]');
  await expect(page.locator('.login-form p')).toHaveText('Your email or password is incorrect!');
});

// This test creates the user and checks the successful registration message
test('Successful User Registration', async ({ page }) => {
  await page.click('a[href="/login"]');
  await page.fill('input[data-qa="signup-email"]', `test${Date.now()}@example.com`);
  await page.fill('input[data-qa="signup-name"]', 'Fresh User');
  await page.click('button[data-qa="signup-button"]');
  await page.locator('#id_gender1').click();
  await expect(page.locator('#id_gender1')).toBeChecked();
  await page.fill('input[data-qa="password"]', 'Fresh1234$');
  await page.selectOption('#days', '15');
  await page.selectOption('#months', 'May');
  await page.selectOption('#years', '2003');
  await page.fill('input[data-qa="first_name"]', 'Fresh');
  await page.fill('input[data-qa="last_name"]', 'User');
  await page.fill('input[data-qa="address"]', '125 home road');
  await page.selectOption('#country', 'Israel');
  await page.fill('input[data-qa="state"]', 'Mandeni');
  await page.fill('input[data-qa="city"]', 'retoria');
  await page.fill('input[data-qa="zipcode"]', '1000');
  await page.fill('input[data-qa="mobile_number"]', '0123456789');
  await page.click('button[data-qa="create-account"]');
  await expect(page.locator('b').filter({ hasText: 'Account Created' })).toBeVisible();
});


test('Successful User Registration with Faker data', async ({ page }) => {

  // Generate fake data
  const name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const email = faker.internet.email();
  const country = faker.location.country();
  const address = faker.location.streetAddress();
  const city = faker.location.city();
  const state = faker.location.state();
  const zipCode = faker.location.zipCode();
  const phone = faker.phone.number();
  const day = faker.date.between({ from: '1980-01-01T00:00:00.000Z', to: '2007-01-01T00:00:00.000Z' });
  const month = faker.date.month();
  const year = faker.date.past().getFullYear();

  // Fill the signup form
  await page.click('a[href="/login"]');
  await page.fill('[data-qa="signup-name"]', name);
  await page.fill('[data-qa="signup-email"]', email);
  await page.click('button[data-qa="signup-button"]');
  await page.locator('#id_gender1').click();
  await expect(page.locator('#id_gender1')).toBeChecked();
  await page.fill('input[data-qa="password"]', 'Fresh1234$');
  await page.selectOption('#days', day.getDate().toString());
  await page.selectOption('#months', month);
  await page.selectOption('#years', '2003');
  await page.fill('input[data-qa="first_name"]', name);
  await page.fill('input[data-qa="last_name"]', last_name);
  await page.fill('input[data-qa="address"]', address);
  await page.selectOption('#country', 'Israel');
  await page.fill('input[data-qa="state"]', state);
  await page.fill('input[data-qa="city"]', city);
  await page.fill('input[data-qa="zipcode"]', zipCode);
  await page.fill('input[data-qa="mobile_number"]', phone);
  await page.click('button[data-qa="create-account"]');
  await expect(page.locator('b').filter({ hasText: 'Account Created' })).toBeVisible();

  console.log(`Signing up with: ${name}, ${email}`);
});


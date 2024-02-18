import { test, expect } from '@playwright/test';

test('login to application', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');

  //login
  await page.getByPlaceholder("Username").fill('standard_user');
  await page.getByPlaceholder("Password").fill('secret_sauce');
  await page.getByText("LOGIN").click()
  await expect(page.getByText("Products")).toBeVisible();

  //add to card
  let product = page.locator('div').filter({ hasText: /^\$29\.99ADD TO CART$/ })
  await product.getByRole('button').click()
  // await page.getByRole("button", { name: 'ADD TO CART' }).click()
  await expect(page.getByRole("button", {name: 'REMOVE'})).toBeVisible();

  //verify in card
  await page.locator('[ href="./cart.html"]').click();
  let productInCart = page.locator('div').filter({ has: page.locator('[href="./inventory-item.html?id=4]')})
  await expect(productInCart).toBeTruthy()
  
  // checkout
  await page.locator('[href="./checkout-step-one.html"]').click();
  await expect(page.getByText("Checkout: Your Information")).toBeVisible();

  // fill checkout info
  await page.getByPlaceholder("First Name").fill('abc');
  await page.getByPlaceholder("Last Name").fill('xyz');
  await page.getByPlaceholder("Zip/Postal Code").fill('12345');
  await page.getByText("CONTINUE").click()
  await expect(page.getByText("Checkout: Overview")).toBeVisible()

  //complete checkout
  await page.locator('[href="./checkout-complete.html"]').click();
  await expect(page.getByText("THANK YOU FOR YOUR ORDER")).toBeVisible();
  

});

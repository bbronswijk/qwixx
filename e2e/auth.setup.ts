import { test as setup } from '@playwright/test';
import { routes } from "./util";

const authFile = 'e2e/.auth/auth.json';

setup('authenticate', async ({page}) => {
  await page.goto(routes.default);
  await page.waitForURL(routes.signIn);

  await page.getByPlaceholder('Enter your name').fill('superman');
  await page.getByRole('button', {name: 'Join the game'}).click();

  await page.waitForURL('/');

  await page.context().storageState({path: authFile});
});
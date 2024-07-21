import { chromium, expect, Locator, Page } from '@playwright/test';
import { ButtonState } from '@/ui/tile';

export const clickButton = (row: Locator, name: number) => row.getByRole('button', { name: name.toString(), exact: true }).click();

export const expectButtonToHaveState = (row: Locator, name: number, state: ButtonState) => expect(row.getByRole('button', { name: name.toString(), exact: true })).toHaveAttribute('data-state', state);

export const routes = {
  signIn: 'sign-in',
  game: '/1234',
  default: '/1234/default',
  variantA: '/1234/variant-a',
  variantB: '/1234/variant-b',
} as const;

export type Routes = typeof routes[keyof typeof routes];

export enum selectors {
  ROWS = 'section',
  VISIBILITY_TOGGLE = 'toggle-score-visibility',
  LOCK = 'lock',
  TOTAL = 'total',
  UNDO = 'undo',
}

export const login = async (page: Page, userName = 'superman') => {
  await page.goto(routes.default);
  await page.waitForURL(routes.signIn);

  await page.getByPlaceholder('Enter your name').fill(userName);
  await page.getByRole('button', {name: 'Join the game'}).click();

  await page.waitForURL('/');
}

export const lockRowInAnotherBrowser = async (variant: Routes = routes.variantA): Promise<Page> => {
  // Use firefox to not use auth state.
  const browseB = await chromium.launch();
  const page = await browseB.newPage();
  await page.context().clearCookies();

  await login(page, 'batman');
  await page.goto(variant)

  const rows = page.locator('section');
  const redRow = rows.first();

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  // Jump to 4 thanks to bonus
  await clickButton(redRow, 5);
  await clickButton(redRow, 6);
  await clickButton(redRow, 7);
  await clickButton(redRow, 12);

  return page;
}

export const expectToast = async (page: Page, content: string) => {
  const toast = page.getByRole('status').last();

  await expect(toast).toContainText(content);
}
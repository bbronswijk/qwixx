import { chromium, expect, Page, test } from '@playwright/test';
import { lockState } from '@/ui/lock';
import { clickButton, expectButtonToHaveState, lockRowInAnotherBrowser, login, Routes, routes } from '../util';
import { bonusBoxState } from '@/app/[roomId]/variant-a/bonus-box';
import { buttonState } from "@/data/tile.model";

test('should not be able to unlock a row when all items are completed', async ({page}) => {
  await page.goto(routes.variantA);

  const rows = page.locator('section');
  const redRow = rows.first();
  const lock = redRow.getByTestId('lock');

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  // Jump to 4 thanks to bonus
  await clickButton(redRow, 5);
  await clickButton(redRow, 6);
  await clickButton(redRow, 7);
  await clickButton(redRow, 8);
  await clickButton(redRow, 9);
  await clickButton(redRow, 10);
  await clickButton(redRow, 11);
  await clickButton(redRow, 12);

  await expect(lock).toBeDisabled();
});

test('should not be able to add bonus boxes when the row is locked by another user', async ({page}) => {
  await page.goto(routes.variantA);

  await lockRowInAnotherBrowser();

  const toggleScoreVisibility = page.getByTestId('toggle-score-visibility');
  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.first();
  const yellowRow = rows.nth(1);
  const lock = redRow.getByTestId('lock');
  const total = redRow.getByTestId('total');

  await toggleScoreVisibility.click()

  await expect(total).toHaveText('0');

  await expect(lock).toHaveAttribute('data-state', lockState.locked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.unchecked);
  await expect(bonus.nth(0)).toHaveAttribute('data-state', bonusBoxState.unchecked);

  await clickButton(yellowRow, 5);

  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await expect(bonus.nth(0)).toHaveAttribute('data-state', bonusBoxState.checked);
  await expect(total).toHaveText('0');
});

test('should lock a row if another users bonus box locks the row', async ({page}) => {
  await page.goto(routes.variantA);

  const pageB = await otherUserBonusLocksRow();

  const rows = page.locator('section');
  const redRow = rows.first();
  const lock = redRow.getByTestId('lock');

  await expect(lock).toHaveAttribute('data-state', lockState.locked);

  await pageB.close();
});

const otherUserBonusLocksRow = async (variant: Routes = routes.variantA): Promise<Page> => {
  // Use firefox to not use auth state.
  const browseB = await chromium.launch();
  const page = await browseB.newPage();
  await page.context().clearCookies();

  await login(page, 'batman');
  await page.goto(variant)

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  await clickButton(redRow, 6);
  await clickButton(redRow, 9);
  await clickButton(redRow, 11);

  await clickButton(yellowRow, 5);
  await clickButton(greenRow, 11);
  await clickButton(blueRow, 10);

  return page;
}

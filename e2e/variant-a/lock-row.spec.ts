import { expect, test } from '@playwright/test';
import { lockState } from '@/ui/lock';
import { clickButton, expectButtonToHaveState, routes } from '../util';
import { buttonState } from '@/ui/tile';
import { bonusBoxState } from '@/app/variant-a/bonus-box';

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

// TODO this is a useful test however I need to figure out how to trigger the locking of the row using pusher in playwright.
test.skip('should not be able to add bonus boxes when the row is locked by another user', async ({page}) => {
  await page.goto(routes.variantA);

  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.first();
  const yellowRow = rows.nth(1);
  const lock = redRow.getByTestId('lock');
  const total = redRow.getByTestId('total');

  await expect(total).toHaveText('0');

  await lock.click(); // Lock row
  await expect(lock).toHaveAttribute('data-state', lockState.locked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.unchecked);
  await expect(bonus.nth(0)).toHaveAttribute('data-state', bonusBoxState.unchecked);

  await clickButton(yellowRow, 5);

  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await expect(bonus.nth(0)).toHaveAttribute('data-state', bonusBoxState.checked);
  await expect(total).toHaveText('0');
});

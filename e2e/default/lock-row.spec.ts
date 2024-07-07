import { expect, test } from '@playwright/test';
import { clickButton, routes } from '../util';

test('should not be able to unlock a row when all items are completed', async ({ page }) => {
  await page.goto(routes.default);

  const rows = page.locator('section');
  const redRow = rows.first();
  const lock = redRow.getByTestId('lock');

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  await clickButton(redRow, 4);
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

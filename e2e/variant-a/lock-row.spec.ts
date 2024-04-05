import { expect, test } from '@playwright/test';
import { lockState } from '@/ui/lock';
import { clickButton, routes } from '../util';


test('should lock the entire row if another player completes a row', async ({page}) => {
  await page.goto(routes.variantA);

  const rows = page.locator('section');
  const redRow = rows.first();
  const lock = redRow.getByTestId('lock');
  const total = redRow.getByTestId('total');

  await expect(total).toHaveText('0');

  await lock.click(); // Lock rw
  await expect(lock).toHaveAttribute('data-state', lockState.locked);

  await expect(redRow.getByRole('button', {name: '2', exact: true})).toBeDisabled();

  await lock.click(); // unlock row

  await expect(redRow.getByRole('button', {name: '2', exact: true})).not.toBeDisabled();
});

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

test('should toggle the state of the last item if another player completes a row', async ({page}) => {
  await page.goto(routes.variantA);

  const rows = page.locator('section');
  const redRow = rows.first();
  const lock = redRow.getByTestId('lock');

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  await clickButton(redRow, 5);
  await clickButton(redRow, 6);

  await lock.click(); // Lock rw
  await expect(lock).toHaveAttribute('data-state', lockState.locked);

  await expect(redRow.getByRole('button', {name: '12', exact: true})).toBeDisabled();

  await lock.click(); // unlock row

  await expect(redRow.getByRole('button', {name: '12', exact: true})).not.toBeDisabled();
});

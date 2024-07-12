import { expect, test } from '@playwright/test';
import { clickButton, routes, selectors } from '../util';

test('Should show a dialog that the game has ended when the user completed 2 rows', async ({page}) => {
  await page.goto(routes.default);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.first();
  const yellowRow = rows.nth(1);

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

  await clickButton(yellowRow, 2);
  await clickButton(yellowRow, 3);
  await clickButton(yellowRow, 4);
  await clickButton(yellowRow, 5);
  await clickButton(yellowRow, 6);
  await clickButton(yellowRow, 7);
  await clickButton(yellowRow, 8);
  await clickButton(yellowRow, 9);
  await clickButton(yellowRow, 10);
  await clickButton(yellowRow, 11);
  await clickButton(yellowRow, 12);

  await expect(page.getByText('Game over')).toBeVisible();
  await expect(page.getByText('156 punten')).toBeVisible();
});

test('Should show a dialog that the game has ended when the user failed 4 turns and reset the game after clicking the finish button', async ({page}) => {
  await page.goto(routes.game);

  await page.getByText('Standaard').click();

  const failedButton = page.getByRole('button', {name: 'Worp mislukt'});

  await failedButton.click();
  await failedButton.click();
  await failedButton.click();
  await failedButton.click();

  await expect(page.getByText('Game over')).toBeVisible();
  await expect(page.getByText('-20 punten')).toBeVisible();

  await page.getByRole('button', {name: 'Finish game'}).click();

  await page.waitForURL(/\/1234/)

  await page.getByText('Standaard').click();

  await page.waitForURL(/\/1234\/default/)

  await page.getByTestId(selectors.VISIBILITY_TOGGLE).click();

  await expect(page.getByTestId('failed-total')).toHaveText('0');
});

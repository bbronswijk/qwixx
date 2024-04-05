import { expect, test } from '@playwright/test';
import { clickButton, routes } from '../util';


test('should reflect the correct total score all selected cells', async ({page}) => {
  await page.goto(routes.variantA);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const totalScore = page.getByTestId('score');
  const failedButton = page.getByRole('button', {name: 'Worp mislukt'});

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  await clickButton(redRow, 5);
  await clickButton(redRow, 6);
  await clickButton(redRow, 7);
  await clickButton(redRow, 8);
  await clickButton(redRow, 9);
  await clickButton(redRow, 10);
  await clickButton(redRow, 11);
  await clickButton(redRow, 12);

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

  await clickButton(greenRow, 10);
  await clickButton(greenRow, 9);
  await clickButton(greenRow, 8);
  await clickButton(greenRow, 7);
  await clickButton(greenRow, 6);
  await clickButton(greenRow, 5);
  await clickButton(greenRow, 4);
  await clickButton(greenRow, 3);
  await clickButton(greenRow, 2);

  await clickButton(blueRow, 10);
  await clickButton(blueRow, 9);
  await clickButton(blueRow, 8);
  await clickButton(blueRow, 6);
  await clickButton(blueRow, 5);
  await clickButton(blueRow, 4);
  await clickButton(blueRow, 3);
  await clickButton(blueRow, 2);

  await expect(totalScore).toHaveText((78 * 4).toString());

  await failedButton.click();
  await failedButton.click();
  await failedButton.click();
  await failedButton.click();

  await expect(totalScore).toHaveText(((78 * 4) - 20).toString());
});


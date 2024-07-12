import { expect, test } from '@playwright/test';
import { clickButton, routes, selectors } from '../util';


test('should reflect the correct total score all selected cells', async ({ page }) => {
  await page.goto(routes.default);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);
  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);

  const totalScore = page.getByTestId('score');
  const failedButton = page.getByRole('button', { name: 'Worp mislukt' });

  await toggleScoreVisibility.click();

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

  await expect(totalScore).toHaveText((78).toString());

  await failedButton.click();
  await failedButton.click();
  await failedButton.click();
  await failedButton.click();

  await expect(totalScore).toHaveText((78 - 20).toString());
});


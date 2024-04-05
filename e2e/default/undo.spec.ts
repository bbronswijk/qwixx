import { test } from '@playwright/test';
import { clickButton, expectButtonToHaveState, routes } from '../util';
import { buttonState } from '@/ui/tile';

test('should be able to undo a checked tile', async ({page}) => {
  await page.goto(routes.default);

  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.nth(0);
  const undoButton = page.getByTestId('undo');

  await clickButton(redRow, 3);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);

  await undoButton.click()

  await expectButtonToHaveState(redRow, 2, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 3, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);
});

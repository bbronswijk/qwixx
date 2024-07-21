import { test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, expectToast, lockRowInAnotherBrowser, routes } from "../util";

import { buttonState } from "@/data/tile.model";

test('it should not be able to undo an action when another user already locked the row', async ({page}) => {
  await page.goto(routes.default);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);

  const undoButton = page.getByTestId('undo');

  await clickButton(yellowRow, 3);

  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);

  await undoButton.click()
  await expectButtonToHaveState(yellowRow, 3, buttonState.unchecked);

  await clickButton(yellowRow, 3);

  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);

  const pageB = await lockRowInAnotherBrowser(routes.default);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 12, buttonState.skipped);

  await undoButton.click()

  await expectToast(page, 'The last action cannot be undone');
  await expectToast(page, 'Someone else already locked a row after your turn');

  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);

  await pageB.close();
});

import { test } from '@playwright/test';
import { clickButton, expectButtonToHaveState, startGame } from '../util';

import { buttonState } from "@/data/tile.model";
import { Variant } from "@/context/variant.context";

test('should be able to undo a checked tile', async ({page}) => {
  await startGame(page, Variant.DEFAULT);

  const rows = page.locator('section');
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

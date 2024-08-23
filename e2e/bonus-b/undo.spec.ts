import { test } from '@playwright/test';
import { clickButton, expectButtonToHaveState, startGame } from '../util';

import { buttonState } from "@/data/tile.model";
import { Variant } from "@/context/variant.context";

test('should be able to undo a checked tile', async ({page}) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const undoButton = page.getByTestId('undo');

  await clickButton(redRow, 3);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);

  await undoButton.click();

  await expectButtonToHaveState(redRow, 2, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 3, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);
});

test('should be able to undo a check lowest type twice', async ({page}) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId('undo');

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  await clickButton(redRow, 11);

  await clickButton(yellowRow, 2);
  await clickButton(yellowRow, 11);

  await clickButton(blueRow, 12);
  await clickButton(blueRow, 11);

  await clickButton(greenRow, 9);

  await expectButtonToHaveState(greenRow, 9, buttonState.checked);
  await expectButtonToHaveState(greenRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 7, buttonState.checked);

  await undoButton.click();

  await expectButtonToHaveState(greenRow, 9, buttonState.unchecked);
  await expectButtonToHaveState(greenRow, 8, buttonState.unchecked);
  await expectButtonToHaveState(greenRow, 7, buttonState.unchecked);
});

test('should be able to undo check every row once', async ({page}) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId('undo');

  await clickButton(yellowRow, 7);
  await clickButton(blueRow, 7);

  await expectButtonToHaveState(redRow, 2, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 12, buttonState.checked);
  await expectButtonToHaveState(blueRow, 7, buttonState.checked);
  await expectButtonToHaveState(blueRow, 6, buttonState.checked);

  await undoButton.click();

  await expectButtonToHaveState(redRow, 2, buttonState.unchecked);
  await expectButtonToHaveState(yellowRow, 9, buttonState.unchecked);
  await expectButtonToHaveState(greenRow, 8, buttonState.unchecked);
  await expectButtonToHaveState(blueRow, 7, buttonState.unchecked);
  await expectButtonToHaveState(blueRow, 6, buttonState.unchecked);
});
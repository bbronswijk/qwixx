import { test } from '@playwright/test';
import { clickButton, expectButtonToHaveState, expectToast, startGame } from '../util';
import { buttonState } from "@/data/tile.model";
import { Variant } from "@/context/variant.context";


test('should automatically add 2 checks to the row with the lowest points', async ({page}) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  await clickButton(redRow, 2);

  await clickButton(yellowRow, 2);
  await clickButton(yellowRow, 3);
  await clickButton(yellowRow, 11);

  await clickButton(greenRow, 12);
  await clickButton(greenRow, 11);
  await clickButton(greenRow, 10);
  await clickButton(greenRow, 9);

  await expectButtonToHaveState(blueRow, 12, buttonState.checked);
  await expectButtonToHaveState(blueRow, 11, buttonState.checked);
});

test('should not automatically add 2 checks if there are multiple rows with the lowest points', async ({page}) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator('section');
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  await clickButton(yellowRow, 2);
  await clickButton(yellowRow, 3);
  await clickButton(yellowRow, 11);

  await clickButton(greenRow, 12);
  await clickButton(greenRow, 11);
  await clickButton(greenRow, 10);
  await clickButton(greenRow, 9);

  await expectButtonToHaveState(blueRow, 12, buttonState.unchecked);
  await expectButtonToHaveState(blueRow, 11, buttonState.unchecked);

  await expectToast(page, 'You may add two checks to one of the lowest rows');
  await expectToast(page, 'Choose either the red or blue row');
});

test('should not check the lowest row when it is locked', async ({page}) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);
  const lock = redRow.getByTestId('lock');

  await lock.click();

  // Add points to other rows
  await clickButton(yellowRow, 2);
  await clickButton(greenRow, 12);
  await clickButton(blueRow, 12);

  await expectButtonToHaveState(blueRow, 11, buttonState.unchecked);
  await expectButtonToHaveState(blueRow, 10, buttonState.unchecked);

  // Trigger bonus box
  await clickButton(yellowRow, 11);
  await clickButton(greenRow, 9);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 3, buttonState.skipped);

  await expectButtonToHaveState(blueRow, 11, buttonState.checked);
  await expectButtonToHaveState(blueRow, 10, buttonState.checked);
});


test('should not check tiles if only the 12 is left', async ({page}) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);

  await clickButton(greenRow, 12);
  await clickButton(greenRow, 11);
  await clickButton(greenRow, 9);

  await clickButton(blueRow, 12);
  await clickButton(blueRow, 11);

  await clickButton(yellowRow, 11);

  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 12, buttonState.checked);
});

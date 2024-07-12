import { test } from '@playwright/test';
import { clickButton, expectButtonToHaveState, expectToast, lockRowInAnotherBrowser, routes } from '../util';
import { buttonState } from '@/ui/tile';


test('should automatically add 2 checks to the row with the lowest points', async ({page}) => {
  await page.goto(routes.variantB);

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
  await page.goto(routes.variantB);

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

test('should not lock the lowest row when it is locked', async ({page}) => {
  await page.goto(routes.variantB);

  await lockRowInAnotherBrowser();

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  // Add points to other rows
  await clickButton(yellowRow, 2);
  await clickButton(greenRow, 12);
  await clickButton(blueRow, 12);

  await expectButtonToHaveState(blueRow, 11, buttonState.unchecked);
  await expectButtonToHaveState(blueRow, 10, buttonState.unchecked);

  // Trigger bonus boc
  await clickButton(yellowRow, 11);
  await clickButton(greenRow, 9);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 3, buttonState.skipped);

  await expectButtonToHaveState(blueRow, 11, buttonState.checked);
  await expectButtonToHaveState(blueRow, 10, buttonState.checked);
});


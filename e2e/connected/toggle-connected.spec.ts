import { expect, test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, openWithDefaultConfiguration, selectors, startGame } from "../util";
import { Variant } from "@/context/variant.context";
import { buttonState } from "@/data/tile.model";

test("should connect the correct cells for Variant A", async ({ page }) => {
  await startGame(page, Variant.CONNECTED);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page, 0);

  await clickButton(redRow, 6);
  await expectButtonToHaveState(redRow, 6, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(redRow, 11);
  await expectButtonToHaveState(redRow, 11, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 3);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 6);
  await expectButtonToHaveState(redRow, 6, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 8);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 11);
  await expectButtonToHaveState(redRow, 11, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 11);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 9);
  await expectButtonToHaveState(greenRow, 9, buttonState.checked);
  await expectButtonToHaveState(blueRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 6);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 4);
  await expectButtonToHaveState(greenRow, 4, buttonState.checked);
  await expectButtonToHaveState(blueRow, 4, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 9);
  await expectButtonToHaveState(greenRow, 9, buttonState.checked);
  await expectButtonToHaveState(blueRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 4);
  await expectButtonToHaveState(greenRow, 4, buttonState.checked);
  await expectButtonToHaveState(blueRow, 4, buttonState.checked);
  await undoButton.click();
});

test("should connect the correct cells for Variant B", async ({ page }) => {
  await startGame(page, Variant.CONNECTED);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page, 1);

  await clickButton(redRow, 4);
  await expectButtonToHaveState(redRow, 4, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 4, buttonState.checked);
  await undoButton.click();

  await clickButton(redRow, 9);
  await expectButtonToHaveState(redRow, 9, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 4);
  await expectButtonToHaveState(redRow, 4, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 4, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 6);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await expectButtonToHaveState(greenRow, 8, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 9);
  await expectButtonToHaveState(redRow, 9, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 11);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 11);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await expectButtonToHaveState(blueRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 8);
  await expectButtonToHaveState(greenRow, 8, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 6);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await expectButtonToHaveState(blueRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 3);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 11);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await expectButtonToHaveState(blueRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 6);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await expectButtonToHaveState(blueRow, 6, buttonState.checked);
  await undoButton.click();
});

test("should connect the correct cells for Variant C", async ({ page }) => {
  await startGame(page, Variant.CONNECTED);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page, 2);

  await clickButton(redRow, 3);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await undoButton.click();

  await clickButton(redRow, 8);
  await expectButtonToHaveState(redRow, 8, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 3);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 6);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await expectButtonToHaveState(greenRow, 8, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 8);
  await expectButtonToHaveState(redRow, 8, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 11);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 10);
  await expectButtonToHaveState(greenRow, 10, buttonState.checked);
  await expectButtonToHaveState(blueRow, 10, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 8);
  await expectButtonToHaveState(greenRow, 8, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 5);
  await expectButtonToHaveState(greenRow, 5, buttonState.checked);
  await expectButtonToHaveState(blueRow, 5, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 3);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 10);
  await expectButtonToHaveState(blueRow, 10, buttonState.checked);
  await expectButtonToHaveState(greenRow, 10, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 5);
  await expectButtonToHaveState(greenRow, 5, buttonState.checked);
  await expectButtonToHaveState(blueRow, 5, buttonState.checked);
  await undoButton.click();
});

test("should connect the correct cells for Variant D", async ({ page }) => {
  await startGame(page, Variant.CONNECTED);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page, 3);

  await clickButton(redRow, 5);
  await expectButtonToHaveState(redRow, 5, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await undoButton.click();

  await clickButton(redRow, 10);
  await expectButtonToHaveState(redRow, 10, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 10, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 3);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 5);
  await expectButtonToHaveState(redRow, 5, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 8);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 10);
  await expectButtonToHaveState(redRow, 10, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 10, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 11);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 8);
  await expectButtonToHaveState(greenRow, 8, buttonState.checked);
  await expectButtonToHaveState(blueRow, 8, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 6);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 3);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await expectButtonToHaveState(blueRow, 3, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 8);
  await expectButtonToHaveState(blueRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 8, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 3);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await expectButtonToHaveState(blueRow, 3, buttonState.checked);
  await undoButton.click();
});

test("should connect the correct cells for Variant E", async ({ page }) => {
  await startGame(page, Variant.CONNECTED);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page, 4);

  await clickButton(redRow, 6);
  await expectButtonToHaveState(redRow, 6, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(redRow, 9);
  await expectButtonToHaveState(redRow, 9, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 3);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 6);
  await expectButtonToHaveState(redRow, 6, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 9);
  await expectButtonToHaveState(yellowRow, 9, buttonState.checked);
  await expectButtonToHaveState(redRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(yellowRow, 11);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 11);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 9);
  await expectButtonToHaveState(greenRow, 9, buttonState.checked);
  await expectButtonToHaveState(blueRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 6);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await expectButtonToHaveState(blueRow, 6, buttonState.checked);
  await undoButton.click();

  await clickButton(greenRow, 3);
  await expectButtonToHaveState(yellowRow, 11, buttonState.checked);
  await expectButtonToHaveState(greenRow, 3, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 9);
  await expectButtonToHaveState(blueRow, 9, buttonState.checked);
  await expectButtonToHaveState(greenRow, 9, buttonState.checked);
  await undoButton.click();

  await clickButton(blueRow, 6);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
  await expectButtonToHaveState(blueRow, 6, buttonState.checked);
  await undoButton.click();
});

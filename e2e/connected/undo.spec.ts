import { expect, test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, openWithDefaultConfiguration, selectors, startGame } from "../util";
import { Variant } from "@/context/variant.context";
import { buttonState } from "@/data/tile.model";

test("should be able to undo selected", async ({ page }) => {
  await startGame(page, Variant.CONNECTED);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page);

  await clickButton(redRow, 6);
  await clickButton(yellowRow, 9);

  await expectButtonToHaveState(yellowRow, 4, buttonState.skipped);
  await expectButtonToHaveState(yellowRow, 5, buttonState.skipped);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 7, buttonState.skipped);
  await expectButtonToHaveState(yellowRow, 8, buttonState.skipped);
  await expectButtonToHaveState(yellowRow, 9, buttonState.checked);

  await clickButton(greenRow, 11);

  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 3, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 7, buttonState.skipped);
  await expectButtonToHaveState(yellowRow, 8, buttonState.skipped);

  await undoButton.click();

  await expectButtonToHaveState(greenRow, 11, buttonState.unchecked);
  await expectButtonToHaveState(yellowRow, 3, buttonState.skipped);
  await expectButtonToHaveState(yellowRow, 7, buttonState.skipped);
  await expectButtonToHaveState(yellowRow, 8, buttonState.skipped);

  await clickButton(greenRow, 7);
  await expectButtonToHaveState(greenRow, 8, buttonState.skipped);

  await clickButton(blueRow, 9);

  await expectButtonToHaveState(blueRow, 9, buttonState.checked);
  await expectButtonToHaveState(greenRow, 8, buttonState.skipped);

  await undoButton.click();

  await expectButtonToHaveState(blueRow, 9, buttonState.unchecked);
  await expectButtonToHaveState(greenRow, 9, buttonState.skipped);
  await expectButtonToHaveState(greenRow, 8, buttonState.skipped);
});

// TODO undo tile that was already checked.

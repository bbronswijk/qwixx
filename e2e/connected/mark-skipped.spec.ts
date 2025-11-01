import { test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, openWithDefaultConfiguration, selectors, startGame } from "../util";
import { Variant } from "@/context/variant.context";
import { buttonState } from "@/data/tile.model";

test("should be mark the other rew as skipped", async ({ page }) => {
  await startGame(page, Variant.CONNECTED);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page, 4);

  await clickButton(greenRow, 11);
  await clickButton(blueRow, 9);
  await clickButton(blueRow, 8);
  await clickButton(blueRow, 7);
  await clickButton(blueRow, 6);

  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await expectButtonToHaveState(greenRow, 10, buttonState.skipped);
  await expectButtonToHaveState(greenRow, 9, buttonState.checked);
  await expectButtonToHaveState(greenRow, 8, buttonState.skipped);
  await expectButtonToHaveState(greenRow, 7, buttonState.skipped);
  await expectButtonToHaveState(greenRow, 6, buttonState.checked);
});

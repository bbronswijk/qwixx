import { expect, test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, startGame } from "../util";

import { buttonState } from "@/data/tile.model";
import { Variant } from "@/context/variant.context";
import { lockState } from "@/ui/lock";

test("should be able to undo a checked tile", async ({ page }) => {
  await startGame(page, Variant.DEFAULT);

  const rows = page.locator("section");
  const redRow = rows.nth(0);
  const undoButton = page.getByTestId("undo");

  await clickButton(redRow, 3);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);

  await undoButton.click();

  await expectButtonToHaveState(redRow, 2, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 3, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);
});

test("should be able to undo a completed row", async ({ page }) => {
  await startGame(page, Variant.DEFAULT);

  const rows = page.locator("section");
  const redRow = rows.nth(0);
  const undoButton = page.getByTestId("undo");
  const lock = redRow.getByTestId("lock");

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  await clickButton(redRow, 4);
  await clickButton(redRow, 5);
  await clickButton(redRow, 6);
  await clickButton(redRow, 12);

  await expectButtonToHaveState(redRow, 2, buttonState.checked);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(redRow, 4, buttonState.checked);
  await expectButtonToHaveState(redRow, 5, buttonState.checked);
  await expectButtonToHaveState(redRow, 6, buttonState.checked);
  await expectButtonToHaveState(redRow, 12, buttonState.checked);

  await expect(lock).toHaveAttribute("data-state", lockState.completed);
  await expect(lock).toBeDisabled();

  await undoButton.click();

  await expectButtonToHaveState(redRow, 6, buttonState.checked);
  await expectButtonToHaveState(redRow, 12, buttonState.unchecked);

  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);
  await expect(lock).toBeEnabled();
});

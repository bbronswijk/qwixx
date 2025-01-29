import { expect, test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, startGame } from "../util";
import { bonusBoxState } from "@/app/[gameId]/bonus-a/bonus-box";
import { buttonState } from "@/data/tile.model";
import { Variant } from "@/context/variant.context";

test("should be able to undo a checked bonus box", async ({ page }) => {
  await startGame(page, Variant.BONUS_A);

  const rows = page.locator("section");
  const bonus = page.getByTestId("bonus-box");
  const redRow = rows.nth(0);
  const undoButton = page.getByTestId("undo");

  await clickButton(redRow, 3);

  await expect(bonus.first()).toHaveAttribute("data-state", bonusBoxState.checked);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(redRow, 4, buttonState.checked);

  await undoButton.click();

  await expectButtonToHaveState(redRow, 2, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 3, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);
});

test("should be able to undo a chain reaction", async ({ page }) => {
  await startGame(page, Variant.BONUS_A);

  const rows = page.locator("section");
  const bonus = page.getByTestId("bonus-box");
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);
  const undoButton = page.getByTestId("undo");

  await clickButton(redRow, 2);
  await clickButton(yellowRow, 4);
  await clickButton(greenRow, 12);

  // Trigger chain reaction
  await clickButton(blueRow, 10);

  // Should have triggered 2 boxes
  await expect(bonus.nth(0)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(1)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(2)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(3)).toHaveAttribute("data-state", bonusBoxState.checked);

  // validate if chain reaction got triggered.
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await expectButtonToHaveState(blueRow, 9, buttonState.checked);

  await undoButton.click();

  await expectButtonToHaveState(redRow, 3, buttonState.unchecked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.unchecked);
  await expectButtonToHaveState(greenRow, 11, buttonState.unchecked);
  await expectButtonToHaveState(blueRow, 9, buttonState.unchecked);
});

test("should be able to undo a locked row and enabled the skipped bonus boxes", async ({ page }) => {
  await startGame(page, Variant.BONUS_A);

  const rows = page.locator("section");
  const bonus = page.getByTestId("bonus-box");
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const undoButton = page.getByTestId("undo");

  await clickButton(redRow, 3);

  await expect(bonus.nth(1)).toHaveAttribute("data-state", bonusBoxState.unchecked);
  await expect(bonus.nth(7)).toHaveAttribute("data-state", bonusBoxState.unchecked);
  await expect(bonus.nth(9)).toHaveAttribute("data-state", bonusBoxState.unchecked);

  // Lock yellow row
  await yellowRow.getByTestId("lock").click();

  await expect(bonus.nth(1)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(7)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(9)).toHaveAttribute("data-state", bonusBoxState.checked);

  await undoButton.click();

  await expect(bonus.nth(1)).toHaveAttribute("data-state", bonusBoxState.unchecked);
  await expect(bonus.nth(7)).toHaveAttribute("data-state", bonusBoxState.unchecked);
  await expect(bonus.nth(9)).toHaveAttribute("data-state", bonusBoxState.unchecked);
});

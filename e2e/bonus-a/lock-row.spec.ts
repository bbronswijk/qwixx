import { expect, test } from "@playwright/test";
import { lockState } from "@/ui/lock";
import { clickButton, expectButtonToHaveState, startGame } from "../util";
import { bonusBoxState } from "@/app/[gameId]/[variant]/bonus-a/bonus-box";
import { buttonState } from "@/data/tile.model";
import { Variant } from "@/context/variant.context";

test("after a row is locked by someone else all bonus boxes of that color should be checked and after that get skipped", async ({ page }) => {
  await startGame(page, Variant.BONUS_A);

  const toggleScoreVisibility = page.getByTestId("toggle-score-visibility");
  const rows = page.locator("section");
  const bonus = page.getByTestId("bonus-box");
  const redRow = rows.first();
  const yellowRow = rows.nth(1);
  const lock = redRow.getByTestId("lock");
  const redRowTotal = redRow.getByTestId("total");
  const totalScore = page.getByTestId("score");

  await toggleScoreVisibility.click();

  // Lock the red row.
  await lock.click();

  // Red row is locked so all red bonus boxes should be checked.
  await expect(bonus.nth(0)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(1)).toHaveAttribute("data-state", bonusBoxState.unchecked);
  await expect(redRowTotal).toHaveText("0");
  await expect(lock).toHaveAttribute("data-state", lockState.locked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.unchecked);

  // Click the yellow 5 (triggers a bonus box)
  await clickButton(yellowRow, 5);

  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);

  // Check if the bonus box is checked, and the yellow 6 is checked.
  await expect(bonus.nth(1)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);
  await expect(redRowTotal).toHaveText("0");
  await expect(totalScore).toHaveText("3");
});

test("after a row is locked all bonus boxes of that color should be checked and after that get skipped", async ({ page }) => {
  await startGame(page, Variant.BONUS_A);

  const toggleScoreVisibility = page.getByTestId("toggle-score-visibility");
  const rows = page.locator("section");
  const bonus = page.getByTestId("bonus-box");
  const redRow = rows.first();
  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  // Lock the red row.
  // Click the yellow 5 (triggers a bonus box)
  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  // red 4 is automatically checked
  await clickButton(redRow, 5);
  await clickButton(redRow, 6);
  await clickButton(redRow, 12);

  // Check if the bonus boxes are automatically checked.
  await expect(bonus.nth(0)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(5)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(8)).toHaveAttribute("data-state", bonusBoxState.checked);

  // Check if we can undo this action.
  await undoButton.click();

  // Check if the bonus boxes are automatically checked.
  await expect(bonus.nth(0)).toHaveAttribute("data-state", bonusBoxState.checked);
  await expect(bonus.nth(5)).toHaveAttribute("data-state", bonusBoxState.unchecked);
  await expect(bonus.nth(8)).toHaveAttribute("data-state", bonusBoxState.unchecked);

  await expectButtonToHaveState(redRow, 12, buttonState.unchecked);
  await expect(redRow.getByTestId("lock")).toHaveAttribute("data-state", lockState.unlocked);
});

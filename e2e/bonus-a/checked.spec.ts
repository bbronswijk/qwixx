import { expect, test } from "@playwright/test";
import { lockState } from "@/ui/lock";
import { clickButton, startGame } from "../util";
import { Variant } from "@/context/variant.context";

test("should reflect the correct total count for the selected cells", async ({ page }) => {
  await startGame(page, Variant.BONUS_A);

  const rows = page.locator("section");
  const redRow = rows.first();
  const toggleScoreVisibility = page.getByTestId("toggle-score-visibility");
  const lock = redRow.getByTestId("lock");
  const total = redRow.getByTestId("total");
  const undoButton = page.getByTestId("undo");

  await toggleScoreVisibility.click();

  await clickButton(redRow, 2);
  await expect(total).toHaveText("1");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 3);
  await expect(total).toHaveText("6"); // Jumbo to 6 points
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 5);
  await expect(total).toHaveText("10");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 6);
  await expect(total).toHaveText("15");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 7);
  await expect(total).toHaveText("21");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 8);
  await expect(total).toHaveText("28");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 9);
  await expect(total).toHaveText("36");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 10);
  await expect(total).toHaveText("45");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 11);
  await expect(total).toHaveText("55");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await undoButton.click(); // Deselect
  await expect(total).toHaveText("45");
  await expect(lock).toHaveAttribute("data-state", lockState.unlocked);

  await clickButton(redRow, 12);
  await expect(total).toHaveText("66");
  await expect(lock).toHaveAttribute("data-state", lockState.completed);

  await undoButton.click(); // Deselect
  await clickButton(redRow, 11);
  await clickButton(redRow, 12);
  await expect(total).toHaveText("78");
  await expect(lock).toHaveAttribute("data-state", lockState.completed);
});

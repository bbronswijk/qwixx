import { expect, test } from "@playwright/test";
import { startGame } from "../util";
import { Variant } from "@/context/variant.context";

test("should reflect the correct total count for the failed roll", async ({ page }) => {
  await startGame(page, Variant.BONUS_B);

  const failedButton = page.getByRole("button", { name: "Worp mislukt" });
  const total = page.getByTestId("failed-total");
  const totalScore = page.getByTestId("score");

  await failedButton.click();
  await expect(total).toHaveText("-5");
  await expect(totalScore).toHaveText("-5");

  await failedButton.click();
  await expect(total).toHaveText("-10");
  await expect(totalScore).toHaveText("-10");

  await failedButton.click();
  await expect(total).toHaveText("-15");
  await expect(totalScore).toHaveText("-15");

  await failedButton.click();
  await expect(total).toHaveText("-20");
  await expect(totalScore).toHaveText("-20");
});

test("should be able to undo a failed roll", async ({ page }) => {
  await startGame(page, Variant.BONUS_B);

  const failedButton = page.getByRole("button", { name: "Worp mislukt" });
  const total = page.getByTestId("failed-total");
  const undoButton = page.getByTestId("undo");

  await failedButton.click();
  await failedButton.click();
  await failedButton.click();

  await expect(total).toHaveText("-15");

  await undoButton.click();

  await expect(total).toHaveText("-10");

  await undoButton.click();

  await expect(total).toHaveText("-5");

  await undoButton.click();

  await expect(total).toHaveText("0");

  await expect(undoButton).toBeDisabled();
});

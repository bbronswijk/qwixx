import { expect, test } from "@playwright/test";
import { clickButton, openWithDefaultConfiguration, selectors, startGame } from "../util";
import { Variant } from "@/context/variant.context";

test("should reflect the correct total score all selected cells", async ({ page }) => {
  await startGame(page, Variant.STEPS);

  const toggleScoreVisibility = page.getByTestId(selectors.VISIBILITY_TOGGLE);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);

  const totalScore = page.getByTestId("score");
  const failedButton = page.getByRole("button", { name: "Penalty" });

  await toggleScoreVisibility.click();

  await openWithDefaultConfiguration(page);

  await clickButton(yellowRow, 2);
  await clickButton(yellowRow, 3);
  await clickButton(yellowRow, 4);
  await clickButton(yellowRow, 5);
  await clickButton(yellowRow, 6);
  await clickButton(yellowRow, 7);
  await clickButton(yellowRow, 8);
  await clickButton(yellowRow, 9);
  await clickButton(yellowRow, 10);
  await clickButton(yellowRow, 11);
  await clickButton(yellowRow, 12);

  await expect(totalScore).toHaveText((88).toString());

  await failedButton.click();
  await failedButton.click();
  await failedButton.click();
  await failedButton.click();

  await expect(totalScore).toHaveText((88 - 20).toString());
});

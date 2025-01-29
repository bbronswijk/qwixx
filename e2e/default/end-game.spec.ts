import { expect, test } from "@playwright/test";
import { clickButton, selectors, startGame } from "../util";
import { Variant } from "@/context/variant.context";

test("Should show a dialog that the game has ended when the user completed 2 rows", async ({ page }) => {
  await startGame(page, Variant.DEFAULT);

  const rows = page.locator(selectors.ROWS);
  const redRow = rows.first();
  const yellowRow = rows.nth(1);

  await clickButton(redRow, 2);
  await clickButton(redRow, 3);
  await clickButton(redRow, 4);
  await clickButton(redRow, 5);
  await clickButton(redRow, 6);
  await clickButton(redRow, 7);
  await clickButton(redRow, 8);
  await clickButton(redRow, 9);
  await clickButton(redRow, 10);
  await clickButton(redRow, 11);
  await clickButton(redRow, 12);

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

  await expect(page.getByText("Game over")).toBeVisible();
  await expect(page.getByText("156 punten")).toBeVisible();
});

test("Should show a dialog that the game has ended when the user failed 4 turns", async ({ page }) => {
  await startGame(page, Variant.DEFAULT);

  const failedButton = page.getByRole("button", { name: "Worp mislukt" });

  await failedButton.click();
  await failedButton.click();
  await failedButton.click();
  await failedButton.click();

  await expect(page.getByText("Game over")).toBeVisible();
  await expect(page.getByText("-20 punten")).toBeVisible();
});

test("Should end the game a soon as someone else completes a row and the current user completes another row", async ({ page }) => {
  await startGame(page, Variant.BONUS_B);

  const rows = page.locator("section");
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const lock = redRow.getByTestId("lock");

  // Lock the red row.
  await lock.click();

  // Complete yellow row
  await clickButton(yellowRow, 2);
  await clickButton(yellowRow, 3);
  await clickButton(yellowRow, 4);
  await clickButton(yellowRow, 5);
  await clickButton(yellowRow, 6);
  await clickButton(yellowRow, 12);

  await expect(page.getByText("Game over")).toBeVisible();
});

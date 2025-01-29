import { test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, expectToast, startGame } from "../util";
import { Variant } from "@/context/variant.context";
import { buttonState } from "@/data/tile.model";

test("shows a toast when the user tries to lock a row without 5 checks", async ({ page }) => {
  await startGame(page, Variant.DEFAULT);

  const rows = page.locator("section");
  const yellowRow = rows.nth(1);

  // Click the 12.
  await clickButton(yellowRow, 12);

  // Should show a toast.
  await expectToast(page, "You need to select at least 5 tiles!");

  await expectButtonToHaveState(yellowRow, 12, buttonState.unchecked);
});

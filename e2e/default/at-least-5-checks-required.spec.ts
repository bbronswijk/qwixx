import { test } from "@playwright/test";
import { clickButton, expectToast, startGame } from "../util";
import { Variant } from "@/context/variant.context";

test('shows a toast when the user tries to lock a row without 5 checks', async ({page}) => {
  await startGame(page, Variant.DEFAULT);

  const rows = page.locator('section');
  const yellowRow = rows.nth(1);

  await clickButton(yellowRow, 12);

  await expectToast(page, 'You need to select at least 5 tiles!');
});
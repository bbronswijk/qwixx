import { expect, test } from "@playwright/test";
import { clickButton, expectButtonToHaveState, selectors, startGame } from "../util";
import { Variant } from "@/context/variant.context";

test('should marked the red cells as skipped when another user completed the first row', async ({page}) => {
  await startGame(page, Variant.MIXED_A);

  const rows = page.locator(selectors.ROWS);
  const firstRow = rows.nth(0);
  const secondRow = rows.nth(1);
  const thirdRow = rows.nth(2);
  const fourthRow = rows.nth(3);
  const lock = firstRow.getByTestId('lock');

  await clickButton(secondRow, 3);

  await lock.click();

  await expectButtonToHaveState(firstRow, 11, 'skipped');
  await expectButtonToHaveState(firstRow, 12, 'skipped');
  await expectButtonToHaveState(secondRow, 2, 'skipped');
  await expectButtonToHaveState(secondRow, 3, 'checked');
  await expectButtonToHaveState(thirdRow, 6, 'unchecked');
  await expectButtonToHaveState(thirdRow, 5, 'unchecked');
  await expectButtonToHaveState(thirdRow, 4, 'unchecked');
  await expectButtonToHaveState(fourthRow, 10, 'unchecked');
  await expectButtonToHaveState(fourthRow, 9, 'unchecked');
  await expectButtonToHaveState(fourthRow, 8, 'unchecked');
  await expectButtonToHaveState(fourthRow, 7, 'unchecked');

  // Complete the third row
  await clickButton(thirdRow, 12);
  await clickButton(thirdRow, 11);
  await clickButton(thirdRow, 10);
  await clickButton(thirdRow, 9);
  await clickButton(thirdRow, 8);
  await clickButton(thirdRow, 7);
  await clickButton(thirdRow, 2);

  await expect(page.getByText('Game over')).toBeVisible();
});


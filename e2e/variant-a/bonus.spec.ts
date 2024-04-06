import { expect, test } from '@playwright/test';
import { clickButton, expectButtonToHaveState, routes } from '../util';
import { buttonState } from '@/ui/tile';
import { bonusBoxState } from '@/app/variant-a/bonus-box';


test('should automatically select the first red box if the first bonus box is hit', async ({ page }) => {
  await page.goto(routes.variantA);

  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.nth(0);
  const greenRow = rows.nth(2);

  await clickButton(greenRow, 11);

  // Expect bonus box 1 to be selected
  await expect(bonus.first()).toHaveAttribute('data-state', bonusBoxState.checked);

  // expect red 3 to be selected
  await expectButtonToHaveState(redRow, 2, buttonState.checked);
});


test('should automatically create a chain reaction when a bonus box is hit', async ({ page }) => {
  await page.goto(routes.variantA);

  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);

  // Setup context
  await clickButton(redRow, 2);
  await clickButton(yellowRow, 4);
  await clickButton(greenRow, 12);
  await clickButton(blueRow, 11);

  // Trigger chain reaction
  await clickButton(blueRow, 10);

  await expect(bonus.nth(3)).toHaveAttribute('data-state', bonusBoxState.checked);
  await expect(bonus.nth(4)).toHaveAttribute('data-state', bonusBoxState.unchecked);

  // validate if chain reaction got triggered.
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await expectButtonToHaveState(greenRow, 11, buttonState.checked);
  await expectButtonToHaveState(blueRow, 9, buttonState.checked);
});


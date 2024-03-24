import { test, expect } from '@playwright/test';
import { lockState } from '@/ui/lock';
import { clickButton, expectButtonToHaveState } from './util';
import { buttonState } from '@/ui/tile';
import { bonusBoxState } from '@/ui/bonus-box';

test('should be able to undo a checked bonus box', async ({ page }) => {
  await page.goto('/');

  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.nth(0);
  const greenRow = rows.nth(2);
  const undoButton = page.getByTestId('undo');

  await clickButton(redRow, 3);

  await expect(bonus.first()).toHaveAttribute('data-state', bonusBoxState.checked);

  await expectButtonToHaveState(redRow, 2, buttonState.skipped);
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(redRow, 4, buttonState.checked);

  await undoButton.click()

  await expectButtonToHaveState(redRow, 2, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 3, buttonState.unchecked);
  await expectButtonToHaveState(redRow, 4, buttonState.unchecked);
});

/**
 * TODO this needs to be fixed in app
 */
test('should be able to undo a chain reaction', async ({ page }) => {
  await page.goto('/');

  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const undoButton = page.getByTestId('undo');

  await clickButton(redRow, 2);

  // Trigger chain reaction
  await clickButton(yellowRow, 5);

  // Should have triggered 2 boxes
  await expect(bonus.nth(0)).toHaveAttribute('data-state', bonusBoxState.checked);
  await expect(bonus.nth(1)).toHaveAttribute('data-state', bonusBoxState.checked);

  // validate if chain reaction got triggered.
  await expectButtonToHaveState(redRow, 3, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.checked);

  await undoButton.click();

  await expectButtonToHaveState(redRow, 3, buttonState.unchecked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.unchecked);
  await expectButtonToHaveState(yellowRow, 6, buttonState.unchecked);
});


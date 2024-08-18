import { expect, test } from '@playwright/test';
import { lockState } from '@/ui/lock';
import { clickButton, expectButtonToHaveState, startGame } from '../util';
import { bonusBoxState } from '@/app/[gameId]/bonus-a/bonus-box';
import { buttonState } from "@/data/tile.model";
import { Variant } from "@/context/variant.context";

test('should not be able to add bonus boxes when the row is locked by another user', async ({page}) => {
  await startGame(page, Variant.BONUS_A);

  const toggleScoreVisibility = page.getByTestId('toggle-score-visibility');
  const rows = page.locator('section');
  const bonus = page.getByTestId('bonus-box');
  const redRow = rows.first();
  const yellowRow = rows.nth(1);
  const lock = redRow.getByTestId('lock');
  const total = redRow.getByTestId('total');

  await toggleScoreVisibility.click()
  await lock.click();

  await expect(total).toHaveText('0');

  await expect(lock).toHaveAttribute('data-state', lockState.locked);
  await expectButtonToHaveState(yellowRow, 5, buttonState.unchecked);
  await expect(bonus.nth(0)).toHaveAttribute('data-state', bonusBoxState.unchecked);

  await clickButton(yellowRow, 5);

  await expectButtonToHaveState(yellowRow, 5, buttonState.checked);
  await expect(bonus.nth(0)).toHaveAttribute('data-state', bonusBoxState.checked);
  await expect(total).toHaveText('0');
});
import { test } from '@playwright/test';
import { clickButton, expectButtonToHaveState, routes } from '../util';
import { buttonState } from '@/ui/tile';


test('should automatically select one box in each row', async ({page}) => {
  await page.goto(routes.variantB);

  const rows = page.locator('section');
  const redRow = rows.nth(0);
  const yellowRow = rows.nth(1);
  const greenRow = rows.nth(2);
  const blueRow = rows.nth(3);


  await clickButton(yellowRow, 7);
  await clickButton(blueRow, 7);

  await expectButtonToHaveState(redRow, 2, buttonState.checked);
  await expectButtonToHaveState(yellowRow, 8, buttonState.checked);
  await expectButtonToHaveState(greenRow, 12, buttonState.checked);
  await expectButtonToHaveState(blueRow, 6, buttonState.checked);
});
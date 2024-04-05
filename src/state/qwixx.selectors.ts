import { Color, colors, TileModel, tiles } from '@/data/tiles';
import { calculateTotalPointsForRow } from '@/utils/calculate-total-points-for-row';
import useQwixxStore from '@/state/qwixx.store';

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector = (color: Color) => useQwixxStore((state) => {
  const selected = state[color];
  const last = tiles[color].at(-1) as TileModel;

  const lastItemIsSelected = selected.includes(last.value);

  // Add 1 tiles if the user completed the row by checking the last tile.
  const numberOfCheckTitles = selected.length + (lastItemIsSelected ? 1 : 0);

  return calculateTotalPointsForRow(numberOfCheckTitles);
});

/**
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = () => {
  return useTotalForRowSelector(colors.red) + useTotalForRowSelector(colors.yellow) + useTotalForRowSelector(colors.green) + useTotalForRowSelector(colors.blue) + useQwixxStore.use.failed() * -5;
};
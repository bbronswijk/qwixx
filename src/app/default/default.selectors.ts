import { calculateTotalPointsForRow, } from '@/utils/map-number-checked-to-score';
import { Color, colors } from '@/data/color';
import useDefaultStore from '@/app/default/default.store';
import { defaultTiles } from '@/app/default/default.config';

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector = (color: Color) => useDefaultStore((state) => {
  return calculateTotalPointsForRow(defaultTiles[color], state[color]);
});

/**
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = () => {
  return useTotalForRowSelector(colors.red) + useTotalForRowSelector(colors.yellow) + useTotalForRowSelector(colors.green) + useTotalForRowSelector(colors.blue) + useDefaultStore.use.failed() * -5;
};
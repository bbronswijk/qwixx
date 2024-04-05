import { variantATiles } from '@/app/variant-a/variant-a.config';
import { calculateTotalPointsForRow } from '@/utils/map-number-checked-to-score';
import useVariantAStore from '@/app/variant-a/variant-a.store';
import { Color, colors } from '@/data/color';

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector = (color: Color) => useVariantAStore((state) => {
  return calculateTotalPointsForRow(variantATiles[color], state[color]);
});

/**
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = () => {
  return useTotalForRowSelector(colors.red) + useTotalForRowSelector(colors.yellow) + useTotalForRowSelector(colors.green) + useTotalForRowSelector(colors.blue) + useVariantAStore.use.failed() * -5;
};
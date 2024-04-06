import { variantBTiles } from '@/app/variant-b/variant-b.config';
import { calculateTotalPointsForRow } from '@/utils/map-number-checked-to-score';
import useVariantBStore from '@/app/variant-b/variant-b.store';
import { Color, colors } from '@/data/color';
import { tileType } from '@/data/tile.model';
import { hasMetRequirements } from '@/app/variant-b/extra/extra-points';

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector = (color: Color) => useVariantBStore((state) => {
  return calculateTotalPointsForRow(variantBTiles[color], state[color]);
});

/**
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = () => {
  const changes = useVariantBStore.use.changes();

  const redRow = useTotalForRowSelector(colors.red);
  const yellowRow = useTotalForRowSelector(colors.yellow);
  const greenRow = useTotalForRowSelector(colors.green);
  const blueRow = useTotalForRowSelector(colors.blue);
  const failed = useVariantBStore.use.failed() * -5;

  const lowestRow = Math.min(redRow, yellowRow, greenRow, blueRow);

  let score = redRow + yellowRow + greenRow + blueRow;

  if (hasMetRequirements(changes, tileType.lowestRowTimesTwo)) {
    score += lowestRow;
  }

  if (hasMetRequirements(changes, tileType.plusThirteen)) {
    score += 13;
  }

  if (!hasMetRequirements(changes, tileType.failedRoundsDontCount)) {
    score += failed;
  }

  return score;
};
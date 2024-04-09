import { calculateTotalPointsForRow } from '@/utils/map-number-checked-to-score';
import QwixxStore from '@/state/store';
import { Color, colors } from '@/data/color';
import { TileModel, tileType } from '@/data/tile.model';

import { hasMetRequirements } from '@/utils/has-met-requirements';

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector = (tiles: Record<Color, TileModel[]>, color: Color) => QwixxStore((state) => {
  return calculateTotalPointsForRow(tiles[color], state[color]);
});

/**
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = (tiles: Record<Color, TileModel[]>) => {
  const changes = QwixxStore.use.changes();

  const redRow = useTotalForRowSelector(tiles, colors.red);
  const yellowRow = useTotalForRowSelector(tiles, colors.yellow);
  const greenRow = useTotalForRowSelector(tiles, colors.green);
  const blueRow = useTotalForRowSelector(tiles, colors.blue);
  const failed = QwixxStore.use.failed() * -5;

  let score = redRow + yellowRow + greenRow + blueRow;

  if (hasMetRequirements(changes, tileType.lowestRowTimesTwo)) {
    const lowestRow = Math.min(redRow, yellowRow, greenRow, blueRow);
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
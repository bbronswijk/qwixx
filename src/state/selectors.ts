import { calculateTotalPointsForRow } from '@/utils/map-number-checked-to-score';
import QwixxStore, { Store } from '@/state/store';
import { Color, colors } from '@/data/color';
import { TileModel, tileType } from '@/data/tile.model';
import { hasMetRequirements } from '@/utils/has-met-requirements';

export const selectionForRow = (color: Color) => (state: Store): number[] => state[color];

/**
 * Check if the user completed 2 rows, so we can end the game.
 */
export const userCompleted2RowsSelector = (state: Store): boolean => {
  const completionCounts = [
    state.red.includes(12),
    state.yellow.includes(12),
    state.green.includes(2),
    state.blue.includes(2)
  ].filter(isComplete => isComplete).length;

  const lockedBySomeoneElse = Object.values(state.lockedBySomeoneElse).filter(locked => locked).length;

  return (completionCounts + lockedBySomeoneElse) >= 2;
};

/**
 * Return all rows that are not locked by someone else.
 */
export const unLockedRowsSelector = (state: Store): { color: Color, value: number }[] => [
  {color: colors.red, value: state.red.length},
  {color: colors.yellow, value: state.yellow.length},
  {color: colors.green, value: state.green.length},
  {color: colors.blue, value: state.blue.length},
].filter(({color}) => !state.lockedBySomeoneElse[color])

/**
 * Return the first lowest row.
 * There could possibly be more.
 */
export const lowestRowSelector = (state: Store): { color: Color, value: number } => {
  const unLockedRows = unLockedRowsSelector(state);
  return unLockedRows.reduce((lowest, row) => lowest.value >= row.value ? row : lowest, unLockedRows[0]);
}

/**
 * Return all rows with the lowest amount of checks.
 */
export const allRowsWithLeastChecksSelector = (state: Store): { color: Color, value: number }[] => {
  const unLockedRows = unLockedRowsSelector(state);
  const rowWithLeastChecks = lowestRowSelector(state);
  return unLockedRows.filter(({value}) => value === rowWithLeastChecks.value);
}

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
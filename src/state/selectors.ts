import { calculateTotalPointsForRow } from '@/utils/map-number-checked-to-score';
import QwixxStore, { State, Store } from '@/state/store';
import { Color, colors, Row, rows } from '@/data/color';
import { tileType } from '@/data/tile.model';
import { hasMetRequirements } from '@/utils/has-met-requirements';
import { Config } from "@/data/config.model";

/**
 * Only select the data not the re
 * @param state
 */
export const stateSelector = (state: Store): State => ({
  gameCompleted: state.gameCompleted,
  changes: state.changes,
  selection: state.selection,
  locked: state.locked,
  bonus: state.bonus,
  failed: state.failed,
  showScore: state.showScore,
  scores: state.scores,
});

export const selectionForRow = (row: Row) => (state: Store): number[] => state.selection[row];

/**
 * Check if users completed 2 rows, so we can end the game.
 */
export const usersCompleted2RowsSelector = (state: Store): boolean => {
  const completionCounts = [
    state.selection.a.includes(12),
    state.selection.b.includes(12),
    state.selection.c.includes(2),
    state.selection.d.includes(2)
  ].filter(isComplete => isComplete).length;

  const lockedRows = Object.values(state.locked).filter(locked => locked).length;

  // return (lockedRows) >= 2;
  return (completionCounts + lockedRows) >= 2;
};

/**
 * Return all rows that are not locked by someone else.
 */
export const unLockedColorsSelector = (state: Store): { color: Color, value: number }[] => [
  {color: colors.red, value: state.selection.a.length},
  {color: colors.yellow, value: state.selection.b.length},
  {color: colors.green, value: state.selection.c.length},
  {color: colors.blue, value: state.selection.d.length},
].filter(({color}) => !state.locked[color])

/**
 * Return the first lowest color.
 * There could possibly be more.
 */
export const lowestColorSelector = (state: Store): { color: Color, value: number } => {
  const unLockedColors = unLockedColorsSelector(state);
  return unLockedColors.reduce((lowest, row) => lowest.value >= row.value ? row : lowest, unLockedColors[0]);
}

/**
 * Return all rows with the lowest amount of checks.
 */
export const allColorsWithLeastChecksSelector = (state: Store): { color: Color, value: number }[] => {
  const unLockedRows = unLockedColorsSelector(state);
  const rowWithLeastChecks = lowestColorSelector(state);
  return unLockedRows.filter(({value}) => value === rowWithLeastChecks.value);
}

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector = (tiles: Config, row: Row) => QwixxStore((state) => {
  return calculateTotalPointsForRow(tiles[row], state.selection[row]);
});

/**
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = (tiles: Config) => {
  const changes = QwixxStore.use.changes();

  const redRow = useTotalForRowSelector(tiles, rows.a);
  const yellowRow = useTotalForRowSelector(tiles, rows.b);
  const greenRow = useTotalForRowSelector(tiles, rows.c);
  const blueRow = useTotalForRowSelector(tiles, rows.d);
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
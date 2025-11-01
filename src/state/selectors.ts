import { calculateTotalPointsForRow, mapNumberCheckedToScore } from "@/utils/map-number-checked-to-score";
import QwixxStore, { State, Store } from "@/state/store";
import { Row, rows } from "@/data/color";
import { tileType } from "@/data/tile.model";
import { hasMetRequirements } from "@/utils/has-met-requirements";
import { Config } from "@/data/config.model";
import { getTotalNumberOfSelectedSteps } from "@/utils/getTotalNumberOfSelectedSteps";

/**
 * Only select the data not the re
 * @param state
 */
export const stateSelector = (state: Store): State => ({
  gameCompleted: state.gameCompleted,
  otherUserCompletedGame: state.otherUserCompletedGame,
  changes: state.changes,
  selection: state.selection,
  locked: state.locked,
  bonus: state.bonus,
  failed: state.failed,
  showScore: state.showScore,
  scores: state.scores,
});

export const selectionForRow =
  (row: Row) =>
  (state: Store): number[] =>
    state.selection[row];

/**
 * Check if users completed 2 rows, so we can end the game.
 */
export const usersCompleted2RowsSelector = (state: Store): boolean => {
  const completionCounts = [state.selection.a.includes(12), state.selection.b.includes(12), state.selection.c.includes(2), state.selection.d.includes(2)].filter(
    (isComplete) => isComplete
  ).length;

  const lockedRows = Object.values(state.locked).filter((locked) => locked).length;

  return completionCounts + lockedRows >= 2;
};

/**
 * Return all rows that are not locked by someone else.
 */
export const unLockedRowsSelector = (state: Store): { row: Row; value: number }[] =>
  [
    { row: rows.a, value: state.selection.a.length },
    { row: rows.b, value: state.selection.b.length },
    { row: rows.c, value: state.selection.c.length },
    { row: rows.d, value: state.selection.d.length },
  ].filter(({ row }) => !state.locked[row]);

/**
 * Return the first lowest color.
 * There could possibly be more.
 */
export const lowestRowSelector = (state: Store): { row: Row; value: number } => {
  const unLockedColors = unLockedRowsSelector(state);
  return unLockedColors.reduce((lowest, row) => (lowest.value >= row.value ? row : lowest), unLockedColors[0]);
};

/**
 * Return all rows with the lowest amount of checks.
 */
export const allRowsWithLeastChecksSelector = (state: Store): { row: Row; value: number }[] => {
  const unLockedRows = unLockedRowsSelector(state);
  const rowWithLeastChecks = lowestRowSelector(state);
  return unLockedRows.filter(({ value }) => value === rowWithLeastChecks.value);
};

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector = (tiles: Config, row: Row) =>
  QwixxStore((state) => {
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

  // Add the selected steps and add them to the score
  const numberOfSelectedSteps = getTotalNumberOfSelectedSteps(tiles);
  score += mapNumberCheckedToScore(numberOfSelectedSteps);

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

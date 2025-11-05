import { mapNumberCheckedToScore } from "@/utils/map-number-checked-to-score";
import { Store, useChanges, useFailed, useTotalForRowSelector, useTotalNumberOfSelectedSteps } from "@/state/store";
import { Row, rows } from "@/data/color";
import { tileType } from "@/data/tile.model";
import { hasMetRequirements } from "@/utils/has-met-requirements";
import { useConfiguration } from "@/context/configuration.context";

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
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = () => {
  const tiles = useConfiguration();
  const changes = useChanges();

  const redRow = useTotalForRowSelector(tiles, rows.a);
  const yellowRow = useTotalForRowSelector(tiles, rows.b);
  const greenRow = useTotalForRowSelector(tiles, rows.c);
  const blueRow = useTotalForRowSelector(tiles, rows.d);
  const failed = useFailed() * -5;

  let score = redRow + yellowRow + greenRow + blueRow;

  // Add the selected steps and add them to the score
  const numberOfSelectedSteps = useTotalNumberOfSelectedSteps(tiles);
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

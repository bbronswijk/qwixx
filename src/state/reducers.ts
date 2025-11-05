import { bonusBoxes, variantATiles } from "@/app/[gameId]/[variant]/bonus-a/variant-a.config";
import { ActionType, Change, Store } from "@/state/store";
import { Color, colorToRow, Row, rows } from "@/data/color";
import { ConnectedTo, NumericTileType, TileModel, tileType } from "@/data/tile.model";
import { getNextTile } from "@/utils/get-next-tile";
import { variantBTiles } from "@/app/[gameId]/[variant]/bonus-b/variant-b.config";
import { lowestRowSelector } from "@/state/selectors";

/**
 * Recursively trigger the tiles.
 */
export const checkTile = (
  state: Store,
  color: Color,
  row: Row,
  type: NumericTileType,
  value: number,
  connectedTo: undefined | ConnectedTo,
  actionType: ActionType
): Partial<Store> => {
  if (state.locked[row]) {
    return state;
  }

  if (type === tileType.connected && connectedTo) {
    const connectedSelection = [...state.selection[connectedTo.row], connectedTo.value].toSorted((a, b) => a - b);

    return {
      ...state,
      changes: [
        ...state.changes,
        { color, row, value, type, actionType },
        { color: connectedTo.color, row: connectedTo.row, value: connectedTo.value, type, actionType: ActionType.game },
      ],
      selection: {
        ...state.selection,
        [row]: [...state.selection[row], value],
        [connectedTo.row]: rows.a === connectedTo.row || rows.b === connectedTo.row ? connectedSelection : connectedSelection.toReversed(),
      },
    };
  }

  // Check next color if we have a normal tile.
  if (type !== tileType.bonus) {
    return {
      ...state,
      changes: [...state.changes, { color, row, value, type, actionType }],
      selection: {
        ...state.selection,
        [row]: [...state.selection[row], value],
      },
    };
  }

  const lowestChecked = findFirstEmptyBonusBox(state.bonus.map(({ id }) => id).sort());
  const bonusBox = bonusBoxes[lowestChecked];

  // Check next bonus box, next color and log change.
  state = {
    ...state,
    selection: {
      ...state.selection,
      [row]: [...state.selection[row], value],
    },
    bonus: [...state.bonus, bonusBox],
    changes: [...state.changes, { color, row, value, type, actionType }],
  };

  // Get next color to be checked
  const nextColor = getNextTile(variantATiles[colorToRow(bonusBox.color)], state.selection[colorToRow(bonusBox.color)]);

  // Return if there is nothing to check.
  if (!nextColor) {
    return state;
  }

  // Pass next color data to next function in case next color is a bonus box.
  return checkTile(state, bonusBox.color, colorToRow(bonusBox.color), nextColor.type, nextColor.value, undefined, ActionType.game);
};

/**
 * Find the first empty bonus box.
 * [0, 1, 2] -> 3
 * In case a row is locked there might be gaps in the list.
 * In that case return the first empty box.
 * [0, 1, 6, 8] -> 2
 */
function findFirstEmptyBonusBox(nums: number[]): number {
  // Iterate through the sorted array
  for (let i = 0; i < nums.length; i++) {
    // If the current number is not equal to the index, return the index
    if (nums[i] !== i) {
      return i;
    }
  }

  // If all numbers are in sequence, return the next number
  return nums.length;
}

/**
 * Recursively undo the last changes.
 */
export const undo = (state: Store, change: Change): Store => {
  // Undo last change
  if (change.type === tileType.failed) {
    state = {
      ...state,
      failed: state.failed - 1,
      // Undo last change.
      changes: state.changes.slice(0, -1),
    };
  } else if (change.type === tileType.lock) {
    state = {
      ...state,
      locked: {
        ...state.locked,
        [change.row]: false,
      },
      // Undo possibly checked bonus boxes.
      bonus: state.bonus.filter(({ id }) => !change.bonus.includes(id)),
      // Undo last change.
      changes: state.changes.slice(0, -1),
    };
  } else {
    state = {
      ...state,
      // If the change was caused by a bonus box uncheck the last bonus box.
      ...(change.type === tileType.bonus && {
        bonus: state.bonus.slice(0, -1),
      }),
      // Deselect last box in the row.
      selection: {
        ...state.selection,
        [change.row]: state.selection[change.row].filter((value) => value !== change.value),
      },
      // Undo last change.
      changes: state.changes.slice(0, -1),
    };
  }

  // Get next change.
  const nextChange = [...state.changes].at(-1);

  // If the change was triggered by a user finish undoing.
  // Or in case all changes have already been undone.
  if (ActionType.user === change.actionType || !nextChange) {
    return state;
  }

  // If the last change was not triggered by a user (but by a bonus box)
  // Continue undoing the next change.
  return undo(state, nextChange);
};

/**
 * Only used by bonus variant B.
 */
export const checkOneInEachRow = (state: Store): Store => {
  const nextRed = getNextTile(variantBTiles.a, state.selection.a);
  const nextYellow = getNextTile(variantBTiles.b, state.selection.b);
  const nextGreen = getNextTile(variantBTiles.c, state.selection.c);
  const nextBlue = getNextTile(variantBTiles.d, state.selection.d);

  const changes = [nextRed, nextYellow, nextGreen, nextBlue].reduce(
    (changes, nextTile) =>
      !!nextTile && !state.locked[colorToRow(nextTile.color)]
        ? [
            ...changes,
            {
              color: nextTile.color,
              value: nextTile.value,
              row: colorToRow(nextTile.color),
              type: nextTile.type,
              actionType: ActionType.game,
            },
          ]
        : changes,
    state.changes
  );

  return {
    ...state,
    changes,
    selection: {
      ...state.selection,
      ...(nextRed && !state.locked.a && { a: [...state.selection.a, nextRed.value] }),
      ...(nextYellow && !state.locked.b && { b: [...state.selection.b, nextYellow.value] }),
      ...(nextGreen && !state.locked.c && { c: [...state.selection.c, nextGreen.value] }),
      ...(nextBlue && !state.locked.d && { d: [...state.selection.d, nextBlue.value] }),
    },
  };
};

/**
 * Only used by bonus variant B.
 */
export const checkLowestRowTwice = (state: Store): Store => {
  const lowestRow = lowestRowSelector(state);

  const firstCheck = getNextTile(variantBTiles[lowestRow.row], state.selection[lowestRow.row]) as TileModel; // Cannot be undefined

  state = {
    ...state,
    changes: [
      ...state.changes,
      {
        type: firstCheck.type,
        row: lowestRow.row,
        color: firstCheck.color,
        value: firstCheck.value,
        actionType: ActionType.game,
      },
    ],
    selection: {
      ...state.selection,
      [lowestRow.row]: [...state.selection[lowestRow.row], firstCheck.value],
    },
  };

  const secondCheck = getNextTile(variantBTiles[lowestRow.row], state.selection[lowestRow.row]) as TileModel; // Cannot be undefined;

  if (!secondCheck) {
    return state;
  }

  return {
    ...state,
    changes: [
      ...state.changes,
      {
        type: secondCheck.type,
        row: lowestRow.row,
        color: secondCheck.color,
        value: secondCheck.value,
        actionType: ActionType.game,
      },
    ],
    selection: {
      ...state.selection,
      [lowestRow.row]: [...state.selection[lowestRow.row], secondCheck.value],
    },
  };
};

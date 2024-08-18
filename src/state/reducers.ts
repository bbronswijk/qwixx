import { bonusBoxes, variantATiles } from '@/app/[gameId]/bonus-a/variant-a.config';
import { ActionType, Change, Store } from '@/state/store';
import { Color, colorToRow, Row } from '@/data/color';
import { NumericTileType, TileModel, tileType } from '@/data/tile.model';
import { getNextTile } from '@/utils/get-next-tile';
import { variantBTiles } from "@/app/[gameId]/bonus-b/variant-b.config";
import { lowestColorSelector } from "@/state/selectors";

/**
 * Recursively trigger the tiles.
 */
export const checkTile = (state: Store, color: Color, row: Row, type: NumericTileType, value: number, actionType: ActionType): Partial<Store> => {
  if (state.locked[color]) {
    return state;
  }

  // Check next color if we have a normal tile.
  if (type !== tileType.bonus) {
    return {
      ...state,
      changes: [...state.changes, {color, row, value, type, actionType}],
      selection: {
        ...state.selection,
        [row]: [...state.selection[row], value],
      },
    };
  }

  // Get next unchecked bonus box
  const bonusBox = bonusBoxes[state.bonus.length];

  // Check next bonus box, next color and log change.
  state = {
    ...state,
    selection: {
      ...state.selection,
      [row]: [...state.selection[row], value],
    },
    bonus: [...state.bonus, bonusBox],
    changes: [...state.changes, {color, row, value, type, actionType}],
  };

  // Get next color to be checked
  const nextColor = getNextTile(variantATiles[colorToRow(bonusBox.color)], state.selection[colorToRow(bonusBox.color)]);

  // Return if there is nothing to check.
  if (!nextColor) {
    return state;
  }

  // Pass next color data to next function in case next color is a bonus box.
  return checkTile(state, bonusBox.color, colorToRow(bonusBox.color), nextColor.type, nextColor.value, ActionType.game);
};

/**
 * Recursively undo the last changes.
 */
export const undo = (state: Store, change: Change): Store => {
  // If the last change came from pusher (from another user) undoing is disabled.
  if (change.actionType === ActionType.pusher) {
    return state;
  }

  // Undo last change
  if (change.type === tileType.failed) {
    state = {
      ...state,
      failed: state.failed - 1,
      // Undo last change.
      changes: state.changes.slice(0, -1)
    };
  } else if (change.type === tileType.lock) {
    state = {
      ...state,
      locked: {
        ...state.locked,
        [change.color]: !state.locked[change.color]
      },
      // Undo last change.
      changes: state.changes.slice(0, -1)
    };
  } else {
    state = {
      ...state,
      // If the change was caused by a bonus box uncheck the last bonus box.
      ...change.type === tileType.bonus && {bonus: state.bonus.slice(0, -1)},
      // Deselect last box in the row.
      selection: {
        ...state.selection,
        [change.row]: state.selection[change.row].slice(0, -1),
      },
      // Undo last change.
      changes: state.changes.slice(0, -1)
    };
  }

  // Get next change.
  const nextChange = [...state.changes].at(-1);

  // If the change was triggered by a user finish undoing.
  // Or in case all changes have already been undone.
  if ([ActionType.user, ActionType.pusher].includes(change.actionType) || !nextChange) {
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

  const changes = [nextRed, nextYellow, nextGreen, nextBlue].reduce((changes, nextTile) => !!nextTile && !state.locked[nextTile.color]
      ? [
        ...changes,
        {
          color: nextTile.color,
          value: nextTile.value,
          row: colorToRow(nextTile.color),
          type: nextTile.type,
          actionType: ActionType.game
        }
      ]
      : changes,
    state.changes
  );

  return {
    ...state,
    changes,
    selection: {
      ...state.selection,
      ...(nextRed && !state.locked.red) && {a: [...state.selection.a, nextRed.value]},
      ...(nextYellow && !state.locked.yellow) && {b: [...state.selection.b, nextYellow.value]},
      ...(nextGreen && !state.locked.green) && {c: [...state.selection.c, nextGreen.value]},
      ...(nextBlue && !state.locked.blue) && {d: [...state.selection.d, nextBlue.value]},
    },
  };
}

/**
 * Only used by bonus variant B.
 */
export const checkLowestRowTwice = (state: Store): Store => {
  const lowestRow = lowestColorSelector(state);

  const firstCheck = getNextTile(variantBTiles[colorToRow(lowestRow.color)], state.selection[colorToRow(lowestRow.color)]) as TileModel; // Cannot be undefined

  state = {
    ...state,
    selection: {
      ...state.selection,
      [colorToRow(lowestRow.color)]: [...state.selection[colorToRow(lowestRow.color)], firstCheck.value]
    }
  };

  const secondCheck = getNextTile(variantBTiles[colorToRow(lowestRow.color)], state.selection[colorToRow(lowestRow.color)]) as TileModel; // Cannot be undefined;

  return {
    ...state,
    selection: {
      ...state.selection,
      [colorToRow(lowestRow.color)]: [...state.selection[colorToRow(lowestRow.color)], secondCheck.value]
    }
  };
}
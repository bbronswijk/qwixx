import { bonusBoxes, variantATiles } from '@/app/[roomId]/variant-a/variant-a.config';
import { ActionType, Change, Store } from '@/state/store';
import { Color } from '@/data/color';
import { NumericTileType, tileType } from '@/data/tile.model';
import { getNextTile } from '@/utils/get-next-tile';

/**
 * Recursively trigger the tiles.
 */
export const checkTile = (state: Store, color: Color, type: NumericTileType, value: number, actionType: ActionType): Partial<Store> => {
  if (state.lockedBySomeoneElse[color]) {
    return state;
  }

  // Check next color if we have a normal tile.
  if (type !== tileType.bonus) {
    return {
      ...state,
      changes: [...state.changes, {color, value, type, actionType}],
      [color]: [...state[color], value],
    };
  }

  // Get next unchecked bonus box
  const bonusBox = bonusBoxes[state.bonus.length];

  // Check next bonus box, next color and log change.
  state = {
    ...state,
    [color]: [...state[color], value],
    bonus: [...state.bonus, bonusBox],
    changes: [...state.changes, {color, value, type, actionType}],
  };

  // Get next color to be checked
  const nextColor = getNextTile(variantATiles[bonusBox.color], state[bonusBox.color]);

  // Return if there is nothing to check.
  if (!nextColor) {
    return state;
  }

  // Pass next color data to next function in case next color is a bonus box.
  return checkTile(state, bonusBox.color, nextColor.type, nextColor.value, ActionType.game);
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
      lockedBySomeoneElse: {
        ...state.lockedBySomeoneElse,
        [change.color]: !state.lockedBySomeoneElse[change.color]
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
      [change.color]: state[change.color].slice(0, -1),
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

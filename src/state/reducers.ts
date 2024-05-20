import { bonusBoxes, variantATiles } from '@/app/variant-a/variant-a.config';
import { Change, Store } from '@/state/store';
import { Color } from '@/data/color';
import { TileType, tileType } from '@/data/tile.model';
import { getNextTile } from '@/utils/get-next-tile';

/**
 * Recursively trigger the tiles.
 */
export const checkTile = (state: Store, color: Color, type: TileType, value: number, userAction: boolean): Partial<Store> => {
  if (state.locked[color]) {
    return state;
  }

  // Check next color if we have a normal tile.
  if (type !== tileType.bonus) {
    return {
      ...state,
      changes: [...state.changes, {color, value, type, userAction}],
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
    changes: [...state.changes, {color, value, type, userAction}],
  };

  // Get next color to be checked
  const nextColor = getNextTile(variantATiles[bonusBox.color], state[bonusBox.color]);

  // Return if there is nothing to check.
  if (!nextColor) {
    return state;
  }

  // Pass next color data to next function in case next color is a bonus box.
  return checkTile(state, bonusBox.color, nextColor.type, nextColor.value, false);
};

/**
 * Recursively undo the last changes.
 */
export const undo = (state: Store, change: Change): Store => {
  // Undo last change
  if ('failed' in change) {
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
      [change.color]: state[change.color].slice(0, -1),
      // Undo last change.
      changes: state.changes.slice(0, -1)
    };
  }

  const nextChange = [...state.changes].at(-1);

  // If the change was triggered by a user finish undoing.
  // Or in case all changes have already been undone.
  if (change.userAction || !nextChange) {
    return state;
  }

  // If the last change was not triggered by a user (but by a bonus box)
  // Continue undoing the next change.
  return undo(state, nextChange);
};

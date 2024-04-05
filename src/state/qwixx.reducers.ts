import { Change, Store } from '@/state/qwix.model';
import { bonusBoxes, Color, tiles } from '@/data/tiles';

/**
 * Recursively trigger the tiles.
 */
export const checkTile = (state: Store, color: Color, bonus: boolean, value: number, userAction: boolean): Partial<Store> => {
  // Check next color if we have a normal tile.
  if (!bonus) {
    return {
      ...state,
      changes: [...state.changes, {color, value, bonus, userAction}],
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
    changes: [...state.changes, {color, value, bonus, userAction}],
  };

  // Get next color to be checked
  const lastSelected = state[bonusBox.color].at(-1);
  const lastSelectedIndex = lastSelected ? tiles[bonusBox.color].findIndex(({value}) => value === lastSelected) : -1;
  const nextColor = tiles[bonusBox.color][lastSelectedIndex + 1];

  // Return if there is nothing to check.
  if (!nextColor) {
    return state;
  }

  // Pass next color data to next function in case next color is a bonus box.
  return checkTile(state, bonusBox.color, nextColor.bonus, nextColor.value, false);
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
  } else {
    state = {
      ...state,
      // If the change was caused by a bonus box uncheck the last bonus box.
      ...change.bonus && {bonus: state.bonus.slice(0, -1)},
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

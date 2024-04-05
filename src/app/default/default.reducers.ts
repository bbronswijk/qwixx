import { Change, DefaultStore } from '@/app/default/default.store';

/**
 * Recursively undo the last changes.
 */
export const undo = (state: DefaultStore, change: Change): DefaultStore => {
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

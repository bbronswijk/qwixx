import { createSelectors } from '@/state/create-selector';
import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import { calculateTotalPointsForRow } from '@/utils/calculate-total-points-for-row';
import { BonusBox, bonusBoxes, Color, colors, TileModel, tiles } from '@/data/tiles';

interface State {
  userActions: UserAction[];

  red: number[],
  yellow: number[],
  green: number[],
  blue: number[],
  bonus: BonusBox[];
  failed: number,

}

interface Reducers {
  checkTile: (key: Color, bonus: boolean, value: number) => void;
  undo: () => void;
  roundFailed: () => void;
}

type Store = State & Reducers;

type UserAction = { color: Color; value: number; bonus: false | number; } | { failed: boolean };

const initialState: State  = {
  userActions: [],
  [colors.red]: [],
  [colors.yellow]: [],
  [colors.green]: [],
  [colors.blue]: [],

  bonus: [],
  failed: 0,
}

const state: StateCreator<Store> = (set) => ({
  ...initialState,

  checkTile: (color: Color, bonus: boolean, value: number) => set((state): Partial<Store> => {
    return {
      ...checkTileRecursive(state, color, bonus, value),
      userActions: [...state.userActions, {color, value, bonus: bonus ? state.bonus.length : false}],
    };
  }),


  roundFailed: () => set((state): Partial<Store> => ({
    failed: state.failed + 1,
    userActions: [...state.userActions, { failed: true }],
  })),

  undo: () => set((state): Partial<Store> => {
    const userActions = [...state.userActions];
    const undoAction = userActions.at(-1) as UserAction; // Cannot be undefined

    return {
      ...undo(state, undoAction),
      userActions: userActions.slice(0,-1),
    };
  }),

});

const useQwixxStore = createSelectors(create<Store>()(
  // persist(
    devtools(state, { store: 'QwixxStore', enabled: true }),
  //   { name: 'QwixxStore' }
  // )
));

const undo = (state: Store, undoAction: UserAction) => {
  if ('failed' in undoAction) {
    return {
      failed: state.failed -1,
    }
  }

  if (undoAction.bonus === false) {
    return {
      [undoAction.color]: state[undoAction.color].slice(0,-1),
    }
  }

  const newState = state.bonus
    .filter((v, i) => i >= (undoAction.bonus as number))
    .reduce((state, bonusBox) => ({
      ...state,
      bonus: removeAtIndex(state.bonus, undoAction.bonus as number),
      [bonusBox.color]: state[bonusBox.color].slice(0, -1),
    }), state);

  return {
    ...newState,
    [undoAction.color]: newState[undoAction.color].slice(0,-1),
  }
}

const removeAtIndex = <T>(arr: T[], index: number): T[] => arr.filter((v, i) => i !== index);

/**
 * Recursively trigger the tiles.
 */
const checkTileRecursive = (state: Store, color: Color, bonus: boolean, value: number): Partial<Store> => {
  if (bonus) {
    const bonusBox = bonusBoxes[state.bonus.length];
    const newState = {
      ...state,
      [color]: [...state[color], value],
      bonus: [...state.bonus, bonusBox],
    };

    const lastSelected = newState[bonusBox.color].at(-1);
    const lastSelectedIndex = lastSelected ? tiles[bonusBox.color].findIndex(({ value }) => value === lastSelected) : -1;
    const nextIndex = lastSelectedIndex + 1;

    const nextColor = tiles[bonusBox.color][nextIndex];

    if (!nextColor) {
      return newState;
    }

    return checkTileRecursive(newState,
      bonusBox.color,
      nextColor.bonus,
      nextColor.value
    );
  }

  return {
    ...state,
    [color]: [...state[color], value],
  };
};

/**
 * Calculate the total score for a single row.
 */
export const useTotalForRowSelector  = (color: Color) => useQwixxStore((state) => {
  const selected = state[color];
  const last = tiles[color].at(-1) as TileModel;

  const lastItemIsSelected = selected.includes(last.value);

  // Add 1 tiles if the user completed the row by checking the last tile.
  const numberOfCheckTitles = selected.length + (lastItemIsSelected ? 1 : 0);

  return calculateTotalPointsForRow(numberOfCheckTitles);
});

/**
 * Add the total sum of all rows and include failed rows.
 */
export const useTotalSelector = () => {
  return useTotalForRowSelector(colors.red) + useTotalForRowSelector(colors.yellow) + useTotalForRowSelector(colors.green) + useTotalForRowSelector(colors.blue) + useQwixxStore.use.failed() * -5;
}

export default useQwixxStore;

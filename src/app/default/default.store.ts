import { createSelectors } from '@/utils/create-selector';
import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import { undo } from '@/app/default/default.reducers';
import { Color, colors } from '@/data/color';
import { TileModel, tileType } from '@/data/tile.model';

export interface State {
  changes: Change[];
  red: number[],
  yellow: number[],
  green: number[],
  blue: number[],
  failed: number,
}

export type CheckTileFn = (tile: TileModel) => void;

interface Reducers {
  checkTile: CheckTileFn;
  undo: () => void;
  roundFailed: () => void;
}

export type DefaultStore = State & Reducers;

export type Change = { color: Color; value: number; bonus: boolean; userAction: boolean } | {
  failed: boolean;
  userAction: boolean
};

const initialState: State = {
  changes: [],
  [colors.red]: [],
  [colors.yellow]: [],
  [colors.green]: [],
  [colors.blue]: [],

  failed: 0,
};

const state: StateCreator<DefaultStore> = (set) => ({
  ...initialState,

  checkTile: ({color, value, type}) => set((state): Partial<DefaultStore> => ({
    ...state,
    changes: [...state.changes, {color, value, bonus: type === tileType.bonus, userAction: true}],
    [color]: [...state[color], value],
  })),

  roundFailed: () => set((state): Partial<DefaultStore> => ({
    failed: state.failed + 1,
    changes: [...state.changes, {failed: true, userAction: true,}],
  })),

  undo: () => set((state): Partial<DefaultStore> => {
    return undo({...state}, [...state.changes].at(-1) as Change);
  }),
});

const useDefaultStore = createSelectors(create<DefaultStore>()(
  // persist(
  devtools(state, {store: 'QwixxVariantAStore', enabled: true}),
  //   { name: 'QwixxStore' }
  // )
));

export default useDefaultStore;

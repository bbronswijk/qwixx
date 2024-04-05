import { createSelectors } from '@/utils/create-selector';
import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import { BonusBox } from '@/app/variant-a/variant-a.config';
import { checkTile, undo } from '@/app/variant-a/variant-a.reducers';
import { Color, colors } from '@/data/color';
import { TileModel, tileType } from '@/data/tile.model';

export interface State {
  changes: Change[];
  red: number[],
  yellow: number[],
  green: number[],
  blue: number[],
  bonus: BonusBox[];
  failed: number,
}

export type CheckTileFn = (tile: TileModel) => void;

interface Reducers {
  checkTile: CheckTileFn;
  undo: () => void;
  roundFailed: () => void;
}

export type VariantAStore = State & Reducers;

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

  bonus: [],
  failed: 0,
};

const state: StateCreator<VariantAStore> = (set) => ({
  ...initialState,

  checkTile: ({color, type, value}) => set((state): Partial<VariantAStore> => {
    return checkTile(state, color, type === tileType.bonus, value, true);
  }),

  roundFailed: () => set((state): Partial<VariantAStore> => ({
    failed: state.failed + 1,
    changes: [...state.changes, {failed: true, userAction: true,}],
  })),

  undo: () => set((state): Partial<VariantAStore> => {
    return undo({...state,}, [...state.changes].at(-1) as Change);
  }),
});

const useVariantAStore = createSelectors(create<VariantAStore>()(
  // persist(
  devtools(state, {store: 'QwixxVariantAStore', enabled: true}),
  //   { name: 'QwixxStore' }
  // )
));

export default useVariantAStore;

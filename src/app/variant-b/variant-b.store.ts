import { createSelectors } from '@/utils/create-selector';
import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import { BonusBox, variantBTiles } from '@/app/variant-b/variant-b.config';
import { Color, colors } from '@/data/color';
import { TileModel, TileType } from '@/data/tile.model';
import { getNextTile } from '@/utils/get-next-tile';
import { undo } from '@/app/variant-b/variant-b.reducers';

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
  checkOneInEachRow: () => void;
  checkLowestRowTwice: () => void;
  undo: () => void;
  roundFailed: () => void;
}

export type VariantBStore = State & Reducers;

export type Change = { color: Color; value: number; type: TileType; userAction: boolean } | {
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

const state: StateCreator<VariantBStore> = (set) => ({
  ...initialState,

  checkTile: ({color, type, value}) => set((state): Partial<VariantBStore> => ({
    ...state,
    changes: [...state.changes, {color, value, type, userAction: true}],
    [color]: [...state[color], value],
  })),

  checkOneInEachRow: () => set((state): Partial<VariantBStore> => {
    const nextRed = getNextTile(variantBTiles.red, state.red);
    const nextYellow = getNextTile(variantBTiles.yellow, state.yellow);
    const nextGreen = getNextTile(variantBTiles.green, state.green);
    const nextBlue = getNextTile(variantBTiles.blue, state.blue);

    const changes = [nextRed, nextYellow, nextGreen, nextBlue].reduce((changes, nextTile) => !!nextTile
        ? [
          ...changes,
          {
            color: nextTile.color,
            value: nextTile.value,
            type: nextTile.type,
            userAction: false
          }
        ]
        : changes,
      state.changes
    );

    return {
      ...state,
      changes,
      ...nextRed && {red: [...state.red, nextRed.value]},
      ...nextYellow && {yellow: [...state.yellow, nextYellow.value]},
      ...nextGreen && {green: [...state.green, nextGreen.value]},
      ...nextBlue && {blue: [...state.blue, nextBlue.value]},
    };
  }),

  checkLowestRowTwice: () => set((state): Partial<VariantBStore> => {
    const rows = [
      {color: colors.red, value: state.red.length},
      {color: colors.yellow, value: state.yellow.length},
      {color: colors.green, value: state.green.length},
      {color: colors.blue, value: state.blue.length},
    ];

    const lowestRow = rows.reduce((lowest, row) => lowest.value >= row.value ? row : lowest, rows[0]);
    const hasMultipleLowestRows = rows.filter(({value}) => value === lowestRow.value).length > 1;

    if (hasMultipleLowestRows) {
      // TODO
      alert('Kies zelf welke rij met het laagste aantal punten je kruisjes wilt zetten');
      return state;
    }

    const firstCheck = getNextTile(variantBTiles[lowestRow.color], state[lowestRow.color]) as TileModel; // Cannot be undefined

    state = {...state, [lowestRow.color]: [...state[lowestRow.color], firstCheck.value]};

    const secondCheck = getNextTile(variantBTiles[lowestRow.color], state[lowestRow.color]) as TileModel; // Cannot be undefined;

    return {...state, [lowestRow.color]: [...state[lowestRow.color], secondCheck.value]};
  }),

  roundFailed: () => set((state): Partial<VariantBStore> => ({
    failed: state.failed + 1,
    changes: [...state.changes, {failed: true, userAction: true,}],
  })),

  undo: () => set((state): Partial<VariantBStore> => {
    return undo({...state,}, [...state.changes].at(-1) as Change);
  }),
});

const useVariantBStore = createSelectors(create<VariantBStore>()(
  // persist(
  devtools(state, {store: 'QwixxVariantAStore', enabled: true}),
  //   { name: 'QwixxStore' }
  // )
));

export default useVariantBStore;

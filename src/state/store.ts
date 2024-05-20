import { createSelectors } from '@/utils/create-selector';
import { devtools } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import { BonusBox } from '@/app/variant-a/variant-a.config';
import { checkTile, undo } from '@/state/reducers';
import { Color, colors } from '@/data/color';
import { FailedTileType, LockTileType, NumericTileType, TileModel, tileType } from '@/data/tile.model';
import { getNextTile } from '@/utils/get-next-tile';
import { variantBTiles } from '@/app/variant-b/variant-b.config';

export interface State {
  changes: Change[];
  red: number[],
  yellow: number[],
  green: number[],
  blue: number[],

  locked: {
    red: boolean;
    yellow: boolean;
    green: boolean;
    blue: boolean;
  },

  bonus: BonusBox[];
  failed: number,
  showScore: boolean;
}

export type CheckTileFn = (tile: TileModel) => void;

interface Reducers {
  checkTile: CheckTileFn;
  reset: () => void;
  undo: () => void;
  roundFailed: () => void;
  checkOneInEachRow: () => void;
  checkLowestRowTwice: () => void;
  toggleRowLocked: (color: Color) => void;
  toggleScoreVisibility: () => void;
}

export type Store = State & Reducers;

export type Change = { type: NumericTileType; color: Color; value: number; userAction: boolean } |
  { type: FailedTileType; userAction: true } |
  { type: LockTileType; color: Color; userAction: true };

const initialState: State = {
  changes: [],

  [colors.red]: [],
  [colors.yellow]: [],
  [colors.green]: [],
  [colors.blue]: [],

  locked: {
    [colors.red]: false,
    [colors.yellow]: false,
    [colors.green]: false,
    [colors.blue]: false,
  },

  bonus: [],
  failed: 0,

  showScore: true,
};

const state: StateCreator<Store> = (set) => ({
  ...initialState,

  reset: () => set((): Partial<Store> => ({
    ...initialState
  })),

  toggleRowLocked: (color: Color) => set((state): Partial<Store> => ({
    ...state,
    changes: [...state.changes, {color, type: tileType.lock, userAction: true,}],
    locked: {
      ...state.locked,
      [color]: !state.locked[color],
    }
  })),

  checkTile: ({color, type, value}) => set((state): Partial<Store> => {
    return checkTile(state, color, type, value, true);
  }),

  roundFailed: () => set((state): Partial<Store> => ({
    failed: state.failed + 1,
    changes: [...state.changes, {type: tileType.failed, userAction: true,}],
  })),

  undo: () => set((state): Partial<Store> => {
    return undo({...state,}, [...state.changes].at(-1) as Change);
  }),

  checkOneInEachRow: () => set((state): Partial<Store> => {
    const nextRed = getNextTile(variantBTiles.red, state.red);
    const nextYellow = getNextTile(variantBTiles.yellow, state.yellow);
    const nextGreen = getNextTile(variantBTiles.green, state.green);
    const nextBlue = getNextTile(variantBTiles.blue, state.blue);

    const changes = [nextRed, nextYellow, nextGreen, nextBlue].reduce((changes, nextTile) => !!nextTile && !state.locked[nextTile.color]
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
      ...(nextRed && !state.locked.red) && {red: [...state.red, nextRed.value]},
      ...(nextYellow && !state.locked.yellow) && {yellow: [...state.yellow, nextYellow.value]},
      ...(nextGreen && !state.locked.green) && {green: [...state.green, nextGreen.value]},
      ...(nextBlue && !state.locked.blue) && {blue: [...state.blue, nextBlue.value]},
    };
  }),

  checkLowestRowTwice: () => set((state): Partial<Store> => {
    const unLockedRows = [
      {color: colors.red, value: state.red.length},
      {color: colors.yellow, value: state.yellow.length},
      {color: colors.green, value: state.green.length},
      {color: colors.blue, value: state.blue.length},
    ].filter(({color}) => !state.locked[color]);

    const lowestRow = unLockedRows.reduce((lowest, row) => lowest.value >= row.value ? row : lowest, unLockedRows[0]);
    const hasMultipleLowestRows = unLockedRows.filter(({value}) => value === lowestRow.value).length > 1;

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

  toggleScoreVisibility: () => set((state): Partial<Store> => ({
    showScore: !state.showScore,
  })),
});

const QwixxStore = createSelectors(create<Store>()(
  // persist(
  devtools(state, {store: 'QwixxStore', enabled: true}),
  //   { name: 'QwixxStore' }
  // )
));

export default QwixxStore;

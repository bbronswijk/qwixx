import { createSelectors } from '@/utils/create-selector';
import { devtools, persist } from 'zustand/middleware';
import { create, StateCreator } from 'zustand';
import { BonusBox } from '@/app/[gameId]/bonus-a/variant-a.config';
import { checkLowestRowTwice, checkOneInEachRow, checkTile, undo } from '@/state/reducers';
import { Color, Row, rows } from '@/data/color';
import { FailedTileType, LockTileType, NumericTileType, TileModel, tileType } from '@/data/tile.model';
import { getScores } from "@/actions/game.actions";

export interface State {
  gameCompleted: boolean;
  changes: Change[];

  selection: {
    a: number[];
    b: number[];
    c: number[];
    d: number[];
  };

  locked: {
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
  };

  bonus: BonusBox[];
  failed: number,
  showScore: boolean;

  scores: { nickname: string; score: number | null }[],
}

export type CheckTileFn = (tile: TileModel, row: Row) => void;

interface Reducers {
  markAsGameCompleted: () => void;
  checkTile: CheckTileFn;
  reset: () => void;
  undo: () => void;
  roundFailed: () => void;
  checkOneInEachRow: () => void;
  checkLowestRowTwice: () => void;
  lockRow: (row: Row) => void;
  toggleScoreVisibility: () => void;
  fetchScore: (pin: number) => void;
}

export type Store = State & Reducers;

export enum ActionType {
  user = 'user',
  pusher = 'pusher',
  game = 'game',
}

export type Change = { type: NumericTileType; row: Row, color: Color; value: number; actionType: ActionType } |
  { type: FailedTileType; actionType: ActionType.user } |
  { type: LockTileType; row: Row; actionType: ActionType };

const initialState: State = {
  gameCompleted: false,
  changes: [],

  selection: {
    [rows.a]: [],
    [rows.b]: [],
    [rows.c]: [],
    [rows.d]: [],
  },

  locked: {
    [rows.a]: false,
    [rows.b]: false,
    [rows.c]: false,
    [rows.d]: false,
  },

  bonus: [],
  failed: 0,

  showScore: false,

  scores: [],
};

const state: StateCreator<Store> = (set) => ({
  ...initialState,

  markAsGameCompleted: () => set((): Partial<Store> => ({
    gameCompleted: true,
    showScore: true,
  })),

  reset: () => set((): Partial<Store> => ({
    ...initialState
  })),

  lockRow: (row: Row) => set((state): Partial<Store> => ({
    ...state,
    changes: [...state.changes, {row, type: tileType.lock, actionType: ActionType.user}],
    locked: {
      ...state.locked,
      [row]: true,
    }
  })),

  checkTile: ({color, type, value}, row) => set((state): Partial<Store> => {
    return checkTile(state, color, row, type, value, ActionType.user);
  }),

  roundFailed: () => set((state): Partial<Store> => ({
    failed: state.failed + 1,
    changes: [...state.changes, {type: tileType.failed, actionType: ActionType.user}],
  })),

  undo: () => set((state): Partial<Store> => {
    return undo({...state,}, [...state.changes].at(-1) as Change);
  }),

  checkOneInEachRow: () => set((state): Partial<Store> => {
    return checkOneInEachRow(state);
  }),

  checkLowestRowTwice: () => set((state): Partial<Store> => {
    return checkLowestRowTwice(state);
  }),

  toggleScoreVisibility: () => set((state): Partial<Store> => ({
    showScore: !state.showScore,
  })),

  fetchScore: async (pin) => {
    const scores = await getScores(pin);
    set({scores})
  }
});

const QwixxStore = createSelectors(create<Store>()(
  persist(
    devtools(state, {store: 'QwixxStore', enabled: true}),
    {name: 'QwixxStore'}
  )
));

export default QwixxStore;

import { StateCreator } from "zustand";
import { BonusBox, bonusBoxes } from "@/app/[gameId]/[variant]/bonus-a/variant-a.config";
import { checkLowestRowTwice, checkOneInEachRow, checkTile, undo } from "@/state/reducers";
import { Color, Row, rows, rowToColor } from "@/data/color";
import { FailedTileType, LockTileType, NumericTileType, TileModel, tileType } from "@/data/tile.model";
import { getScores } from "@/actions/game.actions";
import { createZustandStoreAndContext } from "@/utils/createZustandStoreAndContext.utils";
import { lowestRowSelector, unLockedRowsSelector } from "@/state/selectors";
import { Config } from "@/data/config.model";
import { calculateTotalPointsForRow } from "@/utils/map-number-checked-to-score";

export interface State {
  gameCompleted: boolean;
  otherUserCompletedGame: boolean;
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
  failed: number;
  showScore: boolean;

  scores: { nickname: string; score: number | null }[];
}

export type CheckTileFn = (tile: TileModel, row: Row) => void;

interface Actions {
  markAsGameCompleted: () => void;
  setOtherUserCompletedGame: () => void;
  checkTile: CheckTileFn;
  reset: () => void; // TODO is this still required?
  undo: () => void;
  roundFailed: () => void;
  checkOneInEachRow: () => void;
  checkLowestRowTwice: () => void;
  lockRow: (row: Row) => void;
  completeBonusRow: (row: Row) => void;
  toggleScoreVisibility: () => void;
  fetchScore: (pin: number) => void;
}

export type Store = State & {
  actions: Actions;
};

export enum ActionType {
  user = "user",
  game = "game",
}

export type Change =
  | {
      type: NumericTileType;
      row: Row;
      color: Color;
      value: number;
      actionType: ActionType;
    }
  | { type: FailedTileType; actionType: ActionType.user }
  | { type: LockTileType; row: Row; actionType: ActionType; bonus: number[] };

const initialState: State = {
  gameCompleted: false,
  otherUserCompletedGame: false,
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
  actions: {
    markAsGameCompleted: () =>
      set(
        (): Partial<Store> => ({
          gameCompleted: true,
          showScore: true,
        })
      ),

    setOtherUserCompletedGame: () =>
      set(
        (): Partial<Store> => ({
          otherUserCompletedGame: true,
          showScore: true,
        })
      ),

    reset: () =>
      set(
        (): Partial<Store> => ({
          ...initialState,
        })
      ),

    lockRow: (row: Row) =>
      set((state): Partial<Store> => {
        const checkedIds = state.bonus.map(({ id }) => id);
        const bonus = bonusBoxes.filter((box) => box.color === rowToColor(row)).filter((box) => !checkedIds.includes(box.id));
        return {
          ...state,
          changes: [
            ...state.changes,
            {
              row,
              type: tileType.lock,
              actionType: ActionType.user,
              bonus: bonus.map(({ id }) => id),
            },
          ],
          bonus: state.bonus.concat(bonus),
          locked: {
            ...state.locked,
            [row]: true,
          },
        };
      }),

    /**
     * Mark the Bonus Boxes Of locked row as skipped
     */
    completeBonusRow: (row: Row) =>
      set((state): Partial<Store> => {
        const checkedIds = state.bonus.map(({ id }) => id);
        const bonus = bonusBoxes.filter((box) => box.color === rowToColor(row)).filter((box) => !checkedIds.includes(box.id));
        return {
          ...state,
          changes: [
            ...state.changes,
            {
              row,
              type: tileType.lock,
              actionType: ActionType.game,
              bonus: bonus.map(({ id }) => id),
            },
          ],
          bonus: state.bonus.concat(bonus),
        };
      }),

    checkTile: (tile, row) =>
      set((state): Partial<Store> => {
        return checkTile(state, tile.color, row, tile.type, tile.value, tile.type === tileType.connected ? tile.connectedTo : undefined, ActionType.user);
      }),

    roundFailed: () =>
      set(
        (state): Partial<Store> => ({
          failed: state.failed + 1,
          changes: [...state.changes, { type: tileType.failed, actionType: ActionType.user }],
        })
      ),

    undo: () =>
      set((state): Partial<Store> => {
        return undo({ ...state }, [...state.changes].at(-1) as Change);
      }),

    checkOneInEachRow: () =>
      set((state): Partial<Store> => {
        return checkOneInEachRow(state);
      }),

    checkLowestRowTwice: () =>
      set((state): Partial<Store> => {
        return checkLowestRowTwice(state);
      }),

    toggleScoreVisibility: () =>
      set(
        (state): Partial<Store> => ({
          showScore: !state.showScore,
        })
      ),

    fetchScore: async (pin) => {
      const scores = await getScores(pin);
      set({ scores });
    },
  },
});

const { Provider, useStore } = createZustandStoreAndContext(state, "QwixxStore");

export const useActions = () => useStore(({ actions }) => actions);

export const useGameState = () => useStore(({ actions, ...state }) => state);

export const useGameCompleted = () => useStore((state) => state.gameCompleted);

export const useOtherUserCompletedGame = () => useStore((state) => state.otherUserCompletedGame);

export const useChanges = () => useStore((state) => state.changes);

export const useSelection = () => useStore((state) => state.selection);
export const useSelectionForRow = (row: Row) => useStore((state): number[] => state.selection[row]);

export const useLocked = () => useStore((state) => state.locked);
export const useRowIsLocked = (row: Row) => useStore((state) => state.locked[row]);

export const useBonus = () => useStore((state) => state.bonus);

export const useFailed = () => useStore((state) => state.failed);

export const useShowScore = () => useStore((state) => state.showScore);

export const useScores = () => useStore((state) => state.scores);

export const useAllRowsWithLeastChecksSelector = () =>
  useStore((state: Store): { row: Row; value: number }[] => {
    const unLockedRows = unLockedRowsSelector(state);
    const rowWithLeastChecks = lowestRowSelector(state);
    return unLockedRows.filter(({ value }) => value === rowWithLeastChecks.value);
  });

/**
 * Check if users completed 2 rows, so we can end the game.
 */
export const useUsersCompleted2RowsSelector = () =>
  useStore((state: Store): boolean => {
    const completionCounts = [state.selection.a.includes(12), state.selection.b.includes(12), state.selection.c.includes(2), state.selection.d.includes(2)].filter(
      (isComplete) => isComplete
    ).length;

    const lockedRows = Object.values(state.locked).filter((locked) => locked).length;

    return completionCounts + lockedRows >= 2;
  });

export const useTotalForRowSelector = (tiles: Config, row: Row) => useStore((state) => calculateTotalPointsForRow(tiles[row], state.selection[row]));

const useCountSelectedStepsForRows = (tiles: Config, row: Row): number => {
  const stepsInRow = tiles[row].filter((tile) => tile.type === tileType.step).map(({ value }) => value);
  const selection = useSelection();
  return selection[row].filter((value) => stepsInRow.includes(value)).length;
};

export const useTotalNumberOfSelectedSteps = (tiles: Config) =>
  useCountSelectedStepsForRows(tiles, rows.a) +
  useCountSelectedStepsForRows(tiles, rows.b) +
  useCountSelectedStepsForRows(tiles, rows.c) +
  useCountSelectedStepsForRows(tiles, rows.d);

export { Provider as StoreProvider };

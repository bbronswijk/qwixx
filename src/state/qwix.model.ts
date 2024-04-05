import { BonusBox, Color } from '@/data/tiles';

export interface State {
  changes: Change[];
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

export type Store = State & Reducers;
export type Change = { color: Color; value: number; bonus: boolean; userAction: boolean } | {
  failed: boolean;
  userAction: boolean
};
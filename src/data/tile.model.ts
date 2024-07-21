import { Color } from '@/data/color';

export interface TileModel {
  color: Color;
  value: number;
  type: NumericTileType;
}

export type NumericTileType = Exclude<TileType, 'failed' | 'lock'>;
export type FailedTileType = Extract<TileType, 'failed'>;
export type LockTileType = Extract<TileType, 'lock'>;

export const tileType = {
  default: 'default',
  lock: 'lock',
  failed: 'failed',
  bonus: 'bonus',
  checkTwoInLowestRow: 'checkTwoInLowestRow',
  checkOneInAllRows: 'checkOneInAllRows',
  lowestRowTimesTwo: 'lowestRowTimesTwo',
  plusThirteen: 'plusThirteen',
  failedRoundsDontCount: 'failedRoundsDontCount',
} as const;

export type TileType = keyof typeof tileType;

export const buttonState = {
  unchecked: 'unchecked',
  checked: 'checked',
  skipped: 'skipped',
} as const;
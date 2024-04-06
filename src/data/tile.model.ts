import { Color } from '@/data/color';

export interface TileModel {
  color: Color;
  value: number;
  type: TileType;
}

export const tileType = {
  default: 'default',
  bonus: 'bonus',
  checkTwoInLowestRow: 'checkTwoInLowestRow',
  checkOneInAllRows: 'checkOneInAllRows',
  lowestRowTimesTwo: 'lowestRowTimesTwo',
  plusThirteen: 'plusThirteen',
  failedRoundsDontCount: 'failedRoundsDontCount',
} as const;

export type TileType = keyof typeof tileType;

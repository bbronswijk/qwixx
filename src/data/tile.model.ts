import { Color } from '@/data/color';

export interface TileModel {
  color: Color;
  value: number;
  type: TileType;
}

export const tileType = {
  default: 'default',
  bonus: 'bonus',
} as const;

export type TileType = keyof typeof tileType;

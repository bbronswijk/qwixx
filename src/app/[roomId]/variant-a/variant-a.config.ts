import { Color, colors } from '@/data/color';
import { TileModel, tileType } from '@/data/tile.model';

export const variantATiles: Record<Color, TileModel[]> = {
  [colors.red]: [
    {color: colors.red, value: 2, type: tileType.default},
    {color: colors.red, value: 3, type: tileType.bonus},
    {color: colors.red, value: 4, type: tileType.default},
    {color: colors.red, value: 5, type: tileType.default},
    {color: colors.red, value: 6, type: tileType.bonus},
    {color: colors.red, value: 7, type: tileType.default},
    {color: colors.red, value: 8, type: tileType.default},
    {color: colors.red, value: 9, type: tileType.bonus},
    {color: colors.red, value: 10, type: tileType.default},
    {color: colors.red, value: 11, type: tileType.default},
    {color: colors.red, value: 12, type: tileType.default}
  ],
  [colors.yellow]: [
    {color: colors.yellow, value: 2, type: tileType.default},
    {color: colors.yellow, value: 3, type: tileType.default},
    {color: colors.yellow, value: 4, type: tileType.default},
    {color: colors.yellow, value: 5, type: tileType.bonus},
    {color: colors.yellow, value: 6, type: tileType.default},
    {color: colors.yellow, value: 7, type: tileType.default},
    {color: colors.yellow, value: 8, type: tileType.bonus},
    {color: colors.yellow, value: 9, type: tileType.default},
    {color: colors.yellow, value: 10, type: tileType.default},
    {color: colors.yellow, value: 11, type: tileType.bonus},
    {color: colors.yellow, value: 12, type: tileType.default}
  ],
  [colors.green]: [
    {color: colors.green, value: 12, type: tileType.default},
    {color: colors.green, value: 11, type: tileType.bonus},
    {color: colors.green, value: 10, type: tileType.default},
    {color: colors.green, value: 9, type: tileType.default},
    {color: colors.green, value: 8, type: tileType.default},
    {color: colors.green, value: 7, type: tileType.bonus},
    {color: colors.green, value: 6, type: tileType.default},
    {color: colors.green, value: 5, type: tileType.default},
    {color: colors.green, value: 4, type: tileType.bonus},
    {color: colors.green, value: 3, type: tileType.default},
    {color: colors.green, value: 2, type: tileType.default}
  ],
  [colors.blue]: [
    {color: colors.blue, value: 12, type: tileType.default},
    {color: colors.blue, value: 11, type: tileType.default},
    {color: colors.blue, value: 10, type: tileType.bonus},
    {color: colors.blue, value: 9, type: tileType.default},
    {color: colors.blue, value: 8, type: tileType.bonus},
    {color: colors.blue, value: 7, type: tileType.default},
    {color: colors.blue, value: 6, type: tileType.default},
    {color: colors.blue, value: 5, type: tileType.bonus},
    {color: colors.blue, value: 4, type: tileType.default},
    {color: colors.blue, value: 3, type: tileType.default},
    {color: colors.blue, value: 2, type: tileType.default}
  ]
};

export interface BonusBox {
  id: number,
  color: Color;
  className: string;
}

export const bonusBoxes: BonusBox[] = [
  { id: 0, color: colors.red, className: 'bg-red-800' },
  { id: 1, color: colors.yellow, className: 'bg-yellow-500' },
  { id: 2, color: colors.green, className: 'bg-green-700' },
  { id: 3, color: colors.blue, className: 'bg-blue-800' },

  { id: 4, color: colors.green, className: 'bg-green-700' },
  { id: 5, color: colors.red, className: 'bg-red-800' },
  { id: 6, color: colors.blue, className: 'bg-blue-800' },
  { id: 7, color: colors.yellow, className: 'bg-yellow-500' },

  { id: 8, color: colors.red, className: 'bg-red-800' },
  { id: 9, color: colors.yellow, className: 'bg-yellow-500' },
  { id: 10, color: colors.blue, className: 'bg-blue-800' },
  { id: 11, color: colors.green, className: 'bg-green-700' },
] as const;
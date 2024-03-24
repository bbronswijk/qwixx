export const colors = {
  red: 'red',
  yellow: 'yellow',
  green: 'green',
  blue: 'blue'
} as const;

export type Color = keyof typeof colors;

export type TileModel = { value: number, bonus: boolean }
export type Tiles = TileModel[];

export const tiles: Record<Color, TileModel[]> = {
  [colors.red]: [
    { value: 2, bonus: false },
    { value: 3, bonus: true },
    { value: 4, bonus: false },
    { value: 5, bonus: false },
    { value: 6, bonus: true },
    { value: 7, bonus: false },
    { value: 8, bonus: false },
    { value: 9, bonus: true },
    { value: 10, bonus: false },
    { value: 11, bonus: false },
    { value: 12, bonus: false }
  ],
  [colors.yellow]: [
    { value: 2, bonus: false },
    { value: 3, bonus: false },
    { value: 4, bonus: false },
    { value: 5, bonus: true },
    { value: 6, bonus: false },
    { value: 7, bonus: false },
    { value: 8, bonus: true },
    { value: 9, bonus: false },
    { value: 10, bonus: false },
    { value: 11, bonus: true },
    { value: 12, bonus: false }
  ],
  [colors.green]: [
    { value: 12, bonus: false },
    { value: 11, bonus: true },
    { value: 10, bonus: false },
    { value: 9, bonus: false },
    { value: 8, bonus: false },
    { value: 7, bonus: true },
    { value: 6, bonus: false },
    { value: 5, bonus: false },
    { value: 4, bonus: true },
    { value: 3, bonus: false },
    { value: 2, bonus: false }
  ],
  [colors.blue]: [
    { value: 12, bonus: false },
    { value: 11, bonus: false },
    { value: 10, bonus: true },
    { value: 9, bonus: false },
    { value: 8, bonus: true },
    { value: 7, bonus: false },
    { value: 6, bonus: false },
    { value: 5, bonus: true },
    { value: 4, bonus: false },
    { value: 3, bonus: false },
    { value: 2, bonus: false }
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
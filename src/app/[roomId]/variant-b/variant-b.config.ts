import { Color, colors } from '@/data/color';
import { TileModel, tileType } from '@/data/tile.model';

export const variantBTiles: Record<Color, TileModel[]> = {
  [colors.red]: [
    {color: colors.red, value: 2, type: tileType.default},
    {color: colors.red, value: 3, type: tileType.default},
    {color: colors.red, value: 4, type: tileType.default},
    {color: colors.red, value: 5, type: tileType.default},
    {color: colors.red, value: 6, type: tileType.plusThirteen},
    {color: colors.red, value: 7, type: tileType.default},
    {color: colors.red, value: 8, type: tileType.lowestRowTimesTwo},
    {color: colors.red, value: 9, type: tileType.default},
    {color: colors.red, value: 10, type: tileType.default},
    {color: colors.red, value: 11, type: tileType.default},
    {color: colors.red, value: 12, type: tileType.default}
  ],
  [colors.yellow]: [
    {color: colors.yellow, value: 2, type: tileType.default},
    {color: colors.yellow, value: 3, type: tileType.failedRoundsDontCount},
    {color: colors.yellow, value: 4, type: tileType.default},
    {color: colors.yellow, value: 5, type: tileType.default},
    {color: colors.yellow, value: 6, type: tileType.default},
    {color: colors.yellow, value: 7, type: tileType.checkOneInAllRows},
    {color: colors.yellow, value: 8, type: tileType.default},
    {color: colors.yellow, value: 9, type: tileType.default},
    {color: colors.yellow, value: 10, type: tileType.default},
    {color: colors.yellow, value: 11, type: tileType.checkTwoInLowestRow},
    {color: colors.yellow, value: 12, type: tileType.default}
  ],
  [colors.green]: [
    {color: colors.green, value: 12, type: tileType.default},
    {color: colors.green, value: 11, type: tileType.default},
    {color: colors.green, value: 10, type: tileType.default},
    {color: colors.green, value: 9, type: tileType.checkTwoInLowestRow},
    {color: colors.green, value: 8, type: tileType.default},
    {color: colors.green, value: 7, type: tileType.default},
    {color: colors.green, value: 6, type: tileType.default},
    {color: colors.green, value: 5, type: tileType.failedRoundsDontCount},
    {color: colors.green, value: 4, type: tileType.default},
    {color: colors.green, value: 3, type: tileType.default},
    {color: colors.green, value: 2, type: tileType.default}
  ],
  [colors.blue]: [
    {color: colors.blue, value: 12, type: tileType.default},
    {color: colors.blue, value: 11, type: tileType.default},
    {color: colors.blue, value: 10, type: tileType.lowestRowTimesTwo},
    {color: colors.blue, value: 9, type: tileType.default},
    {color: colors.blue, value: 8, type: tileType.default},
    {color: colors.blue, value: 7, type: tileType.checkOneInAllRows},
    {color: colors.blue, value: 6, type: tileType.default},
    {color: colors.blue, value: 5, type: tileType.default},
    {color: colors.blue, value: 4, type: tileType.plusThirteen},
    {color: colors.blue, value: 3, type: tileType.default},
    {color: colors.blue, value: 2, type: tileType.default}
  ]
};

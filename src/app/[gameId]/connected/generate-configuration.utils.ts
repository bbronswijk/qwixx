import { connectedTiles } from "@/app/[gameId]/connected/connected.config";
import { Config } from "@/data/config.model";
import { colors, rows } from "@/data/color";
import { Direction, tileType } from "@/data/tile.model";

export const generateConfiguration = (index: number): Config => {
  const baseConfig: Config = structuredClone(connectedTiles);

  config.at(index % config.length)!.forEach((tile) => {
    const target = baseConfig[tile.row][tile.index];

    baseConfig[tile.row][tile.index] = {
      ...target,
      type: tileType.connected,
      connectedTo: tile.connectedTo,
    };
  });

  return baseConfig;
};

const configA = [
  {
    row: rows.a,
    value: 6,
    index: 4,
    connectedTo: { color: colors.yellow, row: rows.b, value: 6, direction: Direction.down },
  },
  {
    row: rows.a,
    value: 11,
    index: 9,
    connectedTo: { color: colors.yellow, row: rows.b, value: 11, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 3,
    index: 1,
    connectedTo: { color: colors.green, row: rows.c, value: 11, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 6,
    index: 4,
    connectedTo: { color: colors.red, row: rows.a, value: 6, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 8,
    index: 6,
    connectedTo: { color: colors.green, row: rows.c, value: 6, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 11,
    index: 9,
    connectedTo: { color: colors.red, row: rows.a, value: 11, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 11,
    index: 1,
    connectedTo: { color: colors.yellow, row: rows.b, value: 3, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 9,
    index: 3,
    connectedTo: { color: colors.blue, row: rows.d, value: 9, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 6,
    index: 6,
    connectedTo: { color: colors.yellow, row: rows.b, value: 8, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 4,
    index: 8,
    connectedTo: { color: colors.blue, row: rows.d, value: 4, direction: Direction.down },
  },
  {
    row: rows.d,
    value: 9,
    index: 3,
    connectedTo: { color: colors.green, row: rows.c, value: 9, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 4,
    index: 8,
    connectedTo: { color: colors.green, row: rows.c, value: 4, direction: Direction.up },
  },
] as const;

const configB = [
  {
    row: rows.a,
    value: 4,
    index: 2,
    connectedTo: { color: colors.yellow, row: rows.b, value: 4, direction: Direction.down },
  },
  {
    row: rows.a,
    value: 9,
    index: 7,
    connectedTo: { color: colors.yellow, row: rows.b, value: 9, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 4,
    index: 2,
    connectedTo: { color: colors.red, row: rows.a, value: 4, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 6,
    index: 4,
    connectedTo: { color: colors.green, row: rows.c, value: 8, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 9,
    index: 7,
    connectedTo: { color: colors.red, row: rows.a, value: 9, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 11,
    index: 9,
    connectedTo: { color: colors.green, row: rows.c, value: 3, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 11,
    index: 1,
    connectedTo: { color: colors.blue, row: rows.d, value: 11, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 8,
    index: 4,
    connectedTo: { color: colors.yellow, row: rows.b, value: 6, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 6,
    index: 6,
    connectedTo: { color: colors.blue, row: rows.d, value: 6, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 3,
    index: 9,
    connectedTo: { color: colors.yellow, row: rows.b, value: 11, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 11,
    index: 1,
    connectedTo: { color: colors.green, row: rows.c, value: 11, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 6,
    index: 6,
    connectedTo: { color: colors.green, row: rows.c, value: 6, direction: Direction.up },
  },
] as const;

// {
//   row: rows.,
//     value: ,
//   index: ,
//   connectedTo: { color: colors., row: rows., value: , direction: Direction. },
// },

const configC = [
  {
    row: rows.a,
    value: 2,
    index: 1,
    connectedTo: { color: colors.yellow, row: rows.b, value: 3, direction: Direction.down },
  },
  {
    row: rows.a,
    value: 8,
    index: 6,
    connectedTo: { color: colors.yellow, row: rows.b, value: 8, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 3,
    index: 1,
    connectedTo: { color: colors.red, row: rows.a, value: 3, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 6,
    index: 4,
    connectedTo: { color: colors.green, row: rows.c, value: 8, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 8,
    index: 6,
    connectedTo: { color: colors.red, row: rows.a, value: 8, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 11,
    index: 9,
    connectedTo: { color: colors.green, row: rows.c, value: 3, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 10,
    index: 2,
    connectedTo: { color: colors.blue, row: rows.d, value: 10, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 8,
    index: 4,
    connectedTo: { color: colors.yellow, row: rows.b, value: 6, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 5,
    index: 7,
    connectedTo: { color: colors.blue, row: rows.d, value: 5, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 3,
    index: 9,
    connectedTo: { color: colors.yellow, row: rows.b, value: 11, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 10,
    index: 2,
    connectedTo: { color: colors.blue, row: rows.c, value: 10, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 5,
    index: 7,
    connectedTo: { color: colors.blue, row: rows.c, value: 5, direction: Direction.up },
  },
] as const;

const configD = [
  {
    row: rows.a,
    value: 5,
    index: 3,
    connectedTo: { color: colors.yellow, row: rows.b, value: 5, direction: Direction.down },
  },
  {
    row: rows.a,
    value: 10,
    index: 8,
    connectedTo: { color: colors.yellow, row: rows.b, value: 10, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 3,
    index: 1,
    connectedTo: { color: colors.green, row: rows.c, value: 11, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 5,
    index: 3,
    connectedTo: { color: colors.red, row: rows.a, value: 5, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 8,
    index: 6,
    connectedTo: { color: colors.green, row: rows.c, value: 6, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 10,
    index: 8,
    connectedTo: { color: colors.red, row: rows.a, value: 10, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 11,
    index: 1,
    connectedTo: { color: colors.yellow, row: rows.b, value: 3, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 8,
    index: 4,
    connectedTo: { color: colors.blue, row: rows.d, value: 8, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 6,
    index: 6,
    connectedTo: { color: colors.yellow, row: rows.b, value: 8, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 3,
    index: 9,
    connectedTo: { color: colors.blue, row: rows.d, value: 3, direction: Direction.down },
  },
  {
    row: rows.d,
    value: 8,
    index: 4,
    connectedTo: { color: colors.green, row: rows.c, value: 8, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 3,
    index: 9,
    connectedTo: { color: colors.green, row: rows.c, value: 3, direction: Direction.up },
  },
] as const;

const configE = [
  {
    row: rows.a,
    value: 6,
    index: 4,
    connectedTo: { color: colors.yellow, row: rows.b, value: 6, direction: Direction.down },
  },
  {
    row: rows.a,
    value: 9,
    index: 7,
    connectedTo: { color: colors.yellow, row: rows.b, value: 9, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 3,
    index: 1,
    connectedTo: { color: colors.green, row: rows.c, value: 11, direction: Direction.down },
  },
  {
    row: rows.b,
    value: 6,
    index: 4,
    connectedTo: { color: colors.red, row: rows.a, value: 6, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 9,
    index: 7,
    connectedTo: { color: colors.red, row: rows.a, value: 9, direction: Direction.up },
  },
  {
    row: rows.b,
    value: 11,
    index: 9,
    connectedTo: { color: colors.green, row: rows.c, value: 3, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 11,
    index: 1,
    connectedTo: { color: colors.yellow, row: rows.b, value: 3, direction: Direction.up },
  },
  {
    row: rows.c,
    value: 9,
    index: 3,
    connectedTo: { color: colors.blue, row: rows.d, value: 9, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 6,
    index: 6,
    connectedTo: { color: colors.blue, row: rows.d, value: 6, direction: Direction.down },
  },
  {
    row: rows.c,
    value: 3,
    index: 9,
    connectedTo: { color: colors.yellow, row: rows.b, value: 11, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 9,
    index: 3,
    connectedTo: { color: colors.green, row: rows.c, value: 9, direction: Direction.up },
  },
  {
    row: rows.d,
    value: 6,
    index: 6,
    connectedTo: { color: colors.green, row: rows.c, value: 6, direction: Direction.up },
  },
] as const;

const config = [configA, configB, configC, configD, configE];

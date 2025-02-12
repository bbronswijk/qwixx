import { stepsTiles } from "@/app/[gameId]/steps/steps.config";
import { Config } from "@/data/config.model";
import { rows } from "@/data/color";
import { tileType } from "@/data/tile.model";

/**
 * Loops over the board configuration and assigns 11 random tiles spread over the board with type tileType.step.
 * - There should be 2 - 4 steps per row.
 * - 2 steps should not be adjacent to each other.
 */
export const generateConfiguration = (index: number): Config => {
  const baseConfig: Config = structuredClone(stepsTiles);
  console.log(index, index % config.length);

  config.at(index % config.length)!.forEach((row, index) => (baseConfig[row][index].type = tileType.step));

  console.log(baseConfig);
  return baseConfig;
};

const configA = [rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b] as const;
const configB = [rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b] as const;
const configC = [rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a] as const;
const configD = [rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d] as const;
const configE = [rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c] as const;

const config = [configA, configB, configC, configD, configE];

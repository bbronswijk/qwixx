import { stepsTiles } from "@/app/[gameId]/[variant]/steps/steps.config";
import { Config } from "@/data/config.model";
import { rows } from "@/data/color";
import { tileType } from "@/data/tile.model";

export const generateConfiguration = (index: number): Config => {
  const baseConfig: Config = structuredClone(stepsTiles);

  config.at(index % config.length)!.forEach((row, index) => (baseConfig[row][index].type = tileType.step));

  return baseConfig;
};

const configA = [rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b] as const;
const configB = [rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b] as const;
const configC = [rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a] as const;
const configD = [rows.b, rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d] as const;
const configE = [rows.a, rows.b, rows.c, rows.d, rows.c, rows.b, rows.a, rows.b, rows.c, rows.d, rows.c] as const;

const config = [configA, configB, configC, configD, configE];

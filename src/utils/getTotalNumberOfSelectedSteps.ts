import { Config } from "@/data/config.model";
import { Row, rows } from "@/data/color";
import { tileType } from "@/data/tile.model";
import QwixxStore from "@/state/store";

const countSelectedStepsForRows = (tiles: Config, row: Row): number => {
  const stepsInRow = tiles[row].filter((tile) => tile.type === tileType.step).map(({ value }) => value);
  const selection = QwixxStore.use.selection();
  return selection[row].filter((value) => stepsInRow.includes(value)).length;
};

export const getTotalNumberOfSelectedSteps = (tiles: Config) =>
  countSelectedStepsForRows(tiles, rows.a) + countSelectedStepsForRows(tiles, rows.b) + countSelectedStepsForRows(tiles, rows.c) + countSelectedStepsForRows(tiles, rows.d);

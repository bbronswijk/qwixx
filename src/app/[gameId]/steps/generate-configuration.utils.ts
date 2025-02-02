import { stepsTiles } from "@/app/[gameId]/steps/steps.config";
import { Config } from "@/data/config.model";
import { rows } from "@/data/color";
import { tileType } from "@/data/tile.model";

/**
 * Loops over the board configuration and assigns 11 random tiles spread over the board with type tileType.step.
 * - There should be 2 - 4 steps per row.
 * - 2 steps should not be adjacent to each other.
 */
export const generateConfiguration = (): Config => {
  const baseConfig: Config = structuredClone(stepsTiles);

  const [a, b, c, d] = getNumberOfStepsPerRow();

  pickRandomItemsFromList(a).forEach((index) => (baseConfig[rows.a][index].type = tileType.step));
  pickRandomItemsFromList(b).forEach((index) => (baseConfig[rows.b][index].type = tileType.step));
  pickRandomItemsFromList(c).forEach((index) => (baseConfig[rows.c][index].type = tileType.step));
  pickRandomItemsFromList(d).forEach((index) => (baseConfig[rows.d][index].type = tileType.step));

  return baseConfig;
};

/**
 * Pick the amount of items from the list. 2 picks should not be adjacent to each other.
 */
export const pickRandomItemsFromList = (amount: number) => {
  const results: number[] = [];
  let source = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (let i = 0; i < amount; i++) {
    const randomIndex = Math.floor(Math.random() * source.length);
    const [picked] = source.splice(randomIndex, 1);

    source = source.filter((item) => item !== picked - 1 && item !== picked + 1);

    results.push(picked);
  }

  return results;
};

/**
 * Returns a random array of 4 numbers between 2-4. The total amount of numbers should be 11.
 */
export const getNumberOfStepsPerRow = (): [number, number, number, number] => {
  const minimumPerTile = 2;

  // Pick a random number between 2-4 for the first two tiles.
  const a: number = getRandomBetween(minimumPerTile, 4);

  // max 2nd tiles =  previous - 2 * minimum of last 2 tiles.
  // sum previous 2: max -> 4
  // sum previous 3: max -> 4
  // sum previous 4: max -> 3
  const b: number = getRandomBetween(minimumPerTile, 11 - a - minimumPerTile - minimumPerTile);

  // Max 3rd tiles = sum of previous 2 - minimum of last tile.
  const tilesLeft: number = 11 - a - b; // Possibly sum of first 2 tiles is between 4 and 7
  // 7 left: min -> 3, max -> 4
  // 6 left: min -> 2, max -> 4
  // 5 left: min -> 2, max -> 3
  // 4 left: min -> 2, max -> 2
  const c: number = getRandomBetween(Math.max(minimumPerTile, tilesLeft - 4), tilesLeft - minimumPerTile);
  const d: number = 11 - a - b - c;

  return [a, b, c, d];
};

/**
 * Returns a random integer between min and max, but never higher than 4.
 */
const getRandomBetween = (min: number, max: number): number => {
  return Math.min(Math.floor(Math.random() * (max - min + 1)) + min, 4);
};

import { TileModel } from '@/data/tile.model';

export const calculateTotalPointsForRow = (tiles: TileModel[], selection: number[]): number => {
  const last = tiles.at(-1) as TileModel;
  const lastItemIsSelected = selection.includes(last.value);

  // Add 1 tiles if the user completed the row by checking the last tile.
  const numberOfCheckTitles = selection.length + (lastItemIsSelected ? 1 : 0);

  return mapNumberCheckedToScore(numberOfCheckTitles);
};

export const mapNumberCheckedToScore = (amountChecked: number): number => {
  switch (amountChecked) {
    case 1:
      return 1;
    case 2:
      return 3;
    case 3:
      return 6;
    case 4:
      return 10;
    case 5:
      return 15;
    case 6:
      return 21;
    case 7:
      return 28;
    case 8:
      return 36;
    case 9:
      return 45;
    case 10:
      return 55;
    case 11:
      return 66;
    case 12:
      return 78;
    default:
      return 0;
  }
}
import { TileModel } from '@/data/tile.model';

export const getNextTile = (tiles: TileModel[], selection: number[]): TileModel | undefined => {
  const lastSelected = selection.at(-1);
  const lastSelectedIndex = lastSelected ? tiles.findIndex(({value}) => value === lastSelected) : -1;
  return tiles[lastSelectedIndex + 1];
};
import Tile from '@/ui/tile';
import { cn } from '@/utils/cn';
import React, { HTMLAttributes } from 'react';
import { TriangleIcon } from '@/ui/icons';
import Total from '@/ui/total';
import Lock from '@/ui/lock';
import { CheckTileFn } from '@/state/store';
import { Color } from '@/data/color';
import { calculateTotalPointsForRow } from '@/utils/map-number-checked-to-score';
import { TileModel } from '@/data/tile.model';

interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
  tiles: TileModel[];
  className: string
  onCheckTile: CheckTileFn;
  onLockedIconClicked: (color: Color) => void;
  selection: number[];
  locked: boolean;
}

export default function Row({
                              color,
                              tiles,
                              className,
                              onCheckTile,
                              selection,
                              locked,
                              onLockedIconClicked,
                              ...props
                            }: ComponentProps) {
  const last = tiles.at(-1) as TileModel;
  const lastSelected = selection.at(-1) as number;
  const lastItemIsSelected = selection.includes(last.value);

  return (
    <section className={cn(className, 'flex py-1.5 lg:py-2 pl-6 pr-2 gap-1 rounded-lg relative items-center')} {...props}>
      <TriangleIcon className="absolute h-8 w-8 top-1/2 -translate-y-1/2 text-black left-0 -ml-5"/>

      {tiles.map((tile: TileModel) => {
        const checked = selection.includes(tile.value);
        const skipped = !selection.includes(tile.value) && tiles.findIndex(({value}) => value === lastSelected) > tiles.findIndex(({value}) => tile.value === value);
        const lastItemButNotEnoughSelected = last.value === tile.value && selection.length < 5;

        return (
          <Tile
            key={tile.value}
            checked={checked}
            skipped={skipped || (locked && !selection.includes(tile.value))}
            disabled={checked || skipped || locked || lastItemButNotEnoughSelected}
            type={tile.type}
            onClick={() => onCheckTile(tile)}>{tile.value}</Tile>
        )
      })}

      <Lock lockedBySomeoneElse={locked} completedRow={lastItemIsSelected} onClick={() => onLockedIconClicked(color)}/>

      <Total>{calculateTotalPointsForRow(tiles, selection)}</Total>
    </section>
  );
}

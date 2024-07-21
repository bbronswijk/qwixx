'use client';

import Tile from '@/ui/tile';
import { cn } from '@/utils/cn';
import React, { HTMLAttributes } from 'react';
import { TriangleIcon } from '@/ui/icons';
import TotalRowScore from '@/ui/totalRowScore';
import Lock from '@/ui/lock';
import { Color } from '@/data/color';
import { TileModel } from '@/data/tile.model';
import QwixxStore from "@/state/store";
import { selectionForRow } from "@/state/selectors";

interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
  tiles: TileModel[];
  className: string
  locked: boolean;
}

export default function Row({
                              color,
                              tiles,
                              className,
                              locked,
                              ...props
                            }: ComponentProps) {
  const selection = QwixxStore(selectionForRow(color));
  const last = tiles.at(-1) as TileModel;
  const lastSelected = selection.at(-1) as number;
  const lastItemIsSelected = selection.includes(last.value);

  return (
    <section className={cn(className, 'flex py-1.5 lg:py-2 pl-6 pr-2 gap-1 rounded-lg relative items-center')} {...props}>
      <TriangleIcon className="absolute h-8 w-8 top-1/2 -translate-y-1/2 text-black left-0 -ml-5"/>

      {tiles.map((tile: TileModel, index) => {
        const checked = selection.includes(tile.value);
        const skipped = !selection.includes(tile.value) && tiles.findIndex(({value}) => value === lastSelected) > tiles.findIndex(({value}) => tile.value === value);
        const isLastItem = last.value === tile.value

        return (
          <Tile
            key={tile.value}
            tile={tile}
            checked={checked}
            skipped={skipped || (locked && !selection.includes(tile.value))}
            disabled={checked || skipped || locked}
            isLastItem={isLastItem}
            color={color}>{tile.value}</Tile>
        )
      })}

      <Lock lockedBySomeoneElse={locked} completedRow={lastItemIsSelected}/>
      <TotalRowScore tiles={tiles} selection={selection}/>
    </section>
  );
}

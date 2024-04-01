import Tile from '@/ui/tile';
import { cn } from '@/utils/cn';
import React, { HTMLAttributes, useState } from 'react';
import { TriangleIcon } from '@/ui/icons';
import Total from '@/ui/total';
import Lock from '@/ui/lock';
import useQwixxStore, { useTotalForRowSelector } from '@/state/useQwixxStore';
import { Color, TileModel, Tiles } from '@/data/tiles';

interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
  tiles: Tiles;
  className: string
}

export default function Row({ color, tiles, className, ...props }: ComponentProps) {
  const checkTile = useQwixxStore.use.checkTile();
  const selected = useQwixxStore((state) => state[color]);

  const [locked, setLocked] = useState(false);

  const last = tiles.at(-1) as TileModel;
  const lastSelected = selected.at(-1) as number;
  const lastItemIsSelected = selected.includes(last.value);

  return (
    <section className={cn(className, 'flex py-1.5 lg:py-2 pl-6 pr-2 gap-1 rounded-lg relative items-center')} {...props}>
      <TriangleIcon className="absolute h-8 w-8 top-1/2 -translate-y-1/2 text-black left-0 -ml-5"/>

      {tiles.map(({ value, bonus }) => {
        const checked = selected.includes(value);
        const skipped = !selected.includes(value) && tiles.findIndex(({ value }) => value === lastSelected) > tiles.findIndex((tile) => tile.value === value);
        const lastItemButNotEnoughSelected = last.value === value && selected.length < 5;

        return (
          <Tile
            key={value}
            checked={checked}
            skipped={skipped || (locked && !selected.includes(value))}
            disabled={checked || skipped || locked || lastItemButNotEnoughSelected}
            bonus={bonus}
            onClick={() => checkTile(color, bonus, value)}>{value}</Tile>
        )
      })}

      <Lock lockedBySomeoneElse={locked} completedRow={lastItemIsSelected} onClick={() => setLocked(!locked)}/>

      <Total>{useTotalForRowSelector(color)}</Total>
    </section>
  );
}

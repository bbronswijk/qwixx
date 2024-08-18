'use client';

import Tile from '@/ui/tile';
import { cn } from '@/utils/cn';
import React, { HTMLAttributes } from 'react';
import { TriangleIcon } from '@/ui/icons';
import TotalRowScore from '@/ui/totalRowScore';
import Lock from '@/ui/lock';
import { getColorClasses, Row as RowType } from '@/data/color';
import { TileModel } from '@/data/tile.model';
import QwixxStore from "@/state/store";
import { selectionForRow } from "@/state/selectors";

interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  row: RowType;
  tiles: TileModel[];
}

export default function Row({row, tiles, ...props}: ComponentProps) {
  const selection = QwixxStore(selectionForRow(row));
  const lockedState = QwixxStore.use.locked();
  const last = tiles.at(-1) as TileModel;
  const lastSelected = selection.at(-1) as number;
  const lastItemIsSelected = selection.includes(last.value);
  const lastSelectedIndex = tiles.findIndex(({value}) => value === lastSelected);
  const lockRow = QwixxStore.use.lockRow();
  const gameCompleted = QwixxStore.use.gameCompleted();
  const lockedBySomeoneElse = lockedState[row];

  return (
    <section className="flex relative" {...props}>
      <div className={cn(getColorClasses(tiles.at(0)!.color), 'flex self-stretch items-center pl-6 rounded-l-lg')}>
        <TriangleIcon className="absolute h-8 w-8 top-1/2 -translate-y-1/2 text-black left-0 -ml-5"/>
      </div>

      {tiles.map((tile: TileModel) => {
        const checked = selection.includes(tile.value);
        const tileIndex = tiles.findIndex(({value}) => tile.value === value);
        const skipped = !selection.includes(tile.value) && lastSelectedIndex > tileIndex;
        const isLastItem = last.value === tile.value
        const disabled = checked || skipped || lockedBySomeoneElse || gameCompleted;

        return (
          <Tile
            key={tile.value}
            tile={tile}
            row={row}
            checked={checked}
            skipped={skipped || (lockedBySomeoneElse && !checked)}
            disabled={disabled}
            isLastItem={isLastItem}
            color={tile.color}>{tile.value}</Tile>
        )
      })}

      <div className={cn(getColorClasses(last.color), 'flex self-stretch items-center pr-2 rounded-r-lg')}>
        <Lock lockedBySomeoneElse={lockedBySomeoneElse} completedRow={lastItemIsSelected}
              onClick={() => lockRow(row)}/>
        <TotalRowScore tiles={tiles} selection={selection}/>
      </div>
    </section>
  );
}

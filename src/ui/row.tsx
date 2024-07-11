import Tile from '@/ui/tile';
import { cn } from '@/utils/cn';
import React, { HTMLAttributes } from 'react';
import { EyeOffIcon, TriangleIcon } from '@/ui/icons';
import Total from '@/ui/total';
import Lock from '@/ui/lock';
import QwixxStore from '@/state/store';
import { Color } from '@/data/color';
import { calculateTotalPointsForRow } from '@/utils/map-number-checked-to-score';
import { TileModel } from '@/data/tile.model';
import { triggerLockAction } from '@/actions/pusher.actions';
import { pusherClient } from "@/pusher/pusher.client";
import { useParams } from "next/navigation";
import { useToast } from "@/ui/use-toast";
import { useVariant } from "@/pusher/variant.context";

interface ComponentProps extends HTMLAttributes<HTMLDivElement> {
  color: Color;
  tiles: TileModel[];
  className: string
  selection: number[];
  locked: boolean;
}

export default function Row({
                              color,
                              tiles,
                              className,
                              selection,
                              locked,
                              ...props
                            }: ComponentProps) {
  const last = tiles.at(-1) as TileModel;
  const lastSelected = selection.at(-1) as number;
  const lastItemIsSelected = selection.includes(last.value);
  const toggleScoreVisibility = QwixxStore.use.toggleScoreVisibility();
  const onCheckTile = QwixxStore.use.checkTile();
  const showScore = QwixxStore.use.showScore();
  const {roomId} = useParams<{ roomId: string }>()
  const {toast} = useToast()
  const variant = useVariant()

  return (
    <section className={cn(className, 'flex py-1.5 lg:py-2 pl-6 pr-2 gap-1 rounded-lg relative items-center')} {...props}>
      <TriangleIcon className="absolute h-8 w-8 top-1/2 -translate-y-1/2 text-black left-0 -ml-5"/>

      {tiles.map((tile: TileModel, index) => {
        const checked = selection.includes(tile.value);
        const skipped = !selection.includes(tile.value) && tiles.findIndex(({value}) => value === lastSelected) > tiles.findIndex(({value}) => tile.value === value);
        const isLastItem = last.value === tile.value
        const motEnoughSelected = isLastItem && selection.length < 5;

        return (
          <Tile
            key={tile.value}
            checked={checked}
            skipped={skipped || (locked && !selection.includes(tile.value))}
            disabled={checked || skipped || locked}
            type={tile.type}
            onClick={() => {
              if (isLastItem) {
                if (motEnoughSelected) {
                  toast({title: 'You need to select at least 5 tiles!', variant: 'destructive'})
                  return;
                }

                triggerLockAction(pusherClient.connection.socket_id, variant, roomId, {color})
              }

              onCheckTile(tile)
            }}>{tile.value}</Tile>
        )
      })}

      <Lock lockedBySomeoneElse={locked} completedRow={lastItemIsSelected}/>

      <Total onClick={toggleScoreVisibility}>
        {showScore
          ? calculateTotalPointsForRow(tiles, selection)
          : <EyeOffIcon className="h-4 w-4 lg:h-6 lg:w-6 "/>
        }
      </Total>
    </section>
  );
}

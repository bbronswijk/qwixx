'use client';

import { HTMLAttributes, PropsWithChildren, useEffect, useRef } from 'react';
import { cn } from '@/utils/cn';
import { CheckedIcon, CircleIcon, OctagonIcon, RotatedSquareIcon, SkippedIcon, SquareIcon, StarIcon } from '@/ui/icons';
import { buttonState, TileModel, tileType } from '@/data/tile.model';
import { triggerLockAction } from '@/actions/pusher.actions';
import { pusherClient } from "@/pusher/pusher.client";
import { useVariant } from "@/context/variant.context";
import { useParams } from "next/navigation";
import { Color } from "@/data/color";
import QwixxStore from "@/state/store";
import { useToast } from "@/ui/use-toast";
import { selectionForRow } from "@/state/selectors";

interface ComponentProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  tile: TileModel;
  checked: boolean;
  skipped: boolean;
  disabled: boolean;
  isLastItem: boolean;
  color: Color;
}

export type ButtonState = keyof typeof buttonState;

export default function Tile({
                               children,
                               tile,
                               disabled,
                               checked,
                               skipped,
                               isLastItem,
                               color,
                               ...props
                             }: ComponentProps) {
  const variant = useVariant()
  const {toast} = useToast()
  const selection = QwixxStore(selectionForRow(color));
  const onCheckTile = QwixxStore.use.checkTile();
  const {roomId} = useParams<{ roomId: string }>()
  const variantRef = useRef(variant)
  const roomIdRef = useRef(roomId)
  const colorRef = useRef(color)
  const isLastItemRef = useRef(isLastItem)

  const motEnoughSelected = isLastItem && selection.length < 5;
  let state: ButtonState = buttonState.unchecked;

  if (checked) {
    state = buttonState.checked;
  } else if (skipped) {
    state = buttonState.skipped;
  }

  useEffect(() => {
    if (checked && isLastItemRef.current) {
      triggerLockAction(pusherClient.connection.socket_id, variantRef.current, roomIdRef.current, {color: colorRef.current})
    }

  }, [checked]);

  return <button
    onClick={() => {
      if (isLastItem) {
        if (motEnoughSelected) {
          toast({title: 'You need to select at least 5 tiles!', variant: 'destructive'})
          return;
        }
      }

      onCheckTile(tile)
    }}
    data-state={state}
    className={cn(
      'hover:bg-white/90 rounded-lg text-lg lg:text-3xl font-bold w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center relative bg-white/90',
      checked && 'opacity-30',
      skipped && 'opacity-60',
    )}
    disabled={disabled}
    {...props}>
    {tile.type === tileType.bonus && <SquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
    {tile.type === tileType.checkTwoInLowestRow && <CircleIcon className="h-full w-full absolute text-black p-[1px] "/>}
    {tile.type === tileType.checkOneInAllRows &&
        <RotatedSquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
    {tile.type === tileType.lowestRowTimesTwo && <SquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
    {tile.type === tileType.plusThirteen && <OctagonIcon className="h-full w-full absolute text-black p-[1px]"/>}
    {tile.type === tileType.failedRoundsDontCount && <StarIcon className="h-full w-full absolute text-black p-[1px]"/>}

    {skipped && <SkippedIcon className="h-full w-full absolute -z-10"/>}
    {checked && <CheckedIcon className="h-full w-full absolute -z-10"/>}
    { children }
  </button>
}
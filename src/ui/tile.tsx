'use client';

import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';
import { CheckedIcon, CircleIcon, OctagonIcon, RotatedSquareIcon, SkippedIcon, SquareIcon, StarIcon } from '@/ui/icons';
import { buttonState, TileModel, tileType } from '@/data/tile.model';
import { Color, getColorClasses, Row as RowType } from "@/data/color";
import QwixxStore from "@/state/store";
import { useToast } from "@/ui/use-toast";
import { selectionForRow } from "@/state/selectors";

interface ComponentProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  tile: TileModel;
  row: RowType;
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
                               row,
                               disabled,
                               checked,
                               skipped,
                               isLastItem,
                               color,
                               ...props
                             }: ComponentProps) {
  const {toast} = useToast()
  const selection = QwixxStore(selectionForRow(row));
  const onCheckTile = QwixxStore.use.checkTile();
  let state: ButtonState = buttonState.unchecked;

  if (checked) {
    state = buttonState.checked;
  } else if (skipped) {
    state = buttonState.skipped;
  }

  return (
    <div className={cn(getColorClasses(color), 'py-1.5 lg:py-2 px-0.5')}>
      <button
        onClick={() => {
          if (isLastItem && selection.length < 5) {
            toast({title: 'You need to select at least 5 tiles!', variant: 'destructive'})
            return;
          }

          onCheckTile(tile, row)
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
        {tile.type === tileType.checkTwoInLowestRow &&
            <CircleIcon className="h-full w-full absolute text-black p-[1px] "/>}
        {tile.type === tileType.checkOneInAllRows &&
            <RotatedSquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
        {tile.type === tileType.lowestRowTimesTwo &&
            <SquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
        {tile.type === tileType.plusThirteen && <OctagonIcon className="h-full w-full absolute text-black p-[1px]"/>}
        {tile.type === tileType.failedRoundsDontCount &&
            <StarIcon className="h-full w-full absolute text-black p-[1px]"/>}

        {skipped && <SkippedIcon className="h-full w-full absolute -z-10"/>}
        {checked && <CheckedIcon className="h-full w-full absolute -z-10"/>}
        {children}
      </button>
    </div>
  );
}
"use client";

import { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils/cn";
import { CheckedIcon, CircleIcon, OctagonIcon, RotatedSquareIcon, SkippedIcon, SquareIcon, StarIcon } from "@/ui/icons";
import { buttonState, TileModel, tileType } from "@/data/tile.model";
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

export default function Tile({ children, tile, row, disabled, checked, skipped, isLastItem, color, ...props }: ComponentProps) {
  const { toast } = useToast();
  const selection = QwixxStore(selectionForRow(row));
  const onCheckTile = QwixxStore.use.checkTile();
  let state: ButtonState = buttonState.unchecked;

  if (checked) {
    state = buttonState.checked;
  } else if (skipped) {
    state = buttonState.skipped;
  }

  return (
    <div className={cn(getColorClasses(color), "px-0.5 py-1.5 lg:py-2")}>
      <button
        onClick={() => {
          if (isLastItem && selection.length < 5) {
            toast({
              title: "You need to select at least 5 tiles!",
              variant: "destructive",
            });
            return;
          }

          onCheckTile(tile, row);
        }}
        data-state={state}
        className={cn(
          "relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/90 text-lg font-bold hover:bg-white/90 lg:h-14 lg:w-14 lg:text-3xl",
          checked && "opacity-30",
          skipped && "opacity-60"
        )}
        disabled={disabled}
        {...props}
      >
        {tile.type === tileType.bonus && <SquareIcon className='absolute h-full w-full p-[2px] text-black' />}
        {tile.type === tileType.checkTwoInLowestRow && <CircleIcon className='absolute h-full w-full p-[1px] text-black' />}
        {tile.type === tileType.checkOneInAllRows && <RotatedSquareIcon className='absolute h-full w-full p-[2px] text-black' />}
        {tile.type === tileType.lowestRowTimesTwo && <SquareIcon className='absolute h-full w-full p-[2px] text-black' />}
        {tile.type === tileType.plusThirteen && <OctagonIcon className='absolute h-full w-full p-[1px] text-black' />}
        {tile.type === tileType.failedRoundsDontCount && <StarIcon className='absolute h-full w-full p-[1px] text-black' />}

        {skipped && <SkippedIcon className='absolute -z-10 h-full w-full' />}
        {checked && <CheckedIcon className='absolute -z-10 h-full w-full' />}
        {children}
      </button>
    </div>
  );
}

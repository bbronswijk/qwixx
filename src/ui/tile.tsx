import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';
import { CheckedIcon, CircleIcon, OctagonIcon, RotatedSquareIcon, SkippedIcon, SquareIcon, StarIcon } from '@/ui/icons';
import { TileType, tileType } from '@/data/tile.model';

interface ComponentProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  type: TileType;
  checked: boolean;
  skipped: boolean;
  disabled: boolean;
  onClick: () => void;
}

export const buttonState = {
  unchecked: 'unchecked',
  checked: 'checked',
  skipped: 'skipped',
} as const;

export type ButtonState = keyof typeof buttonState;

export default function Tile({children, disabled, onClick, type, checked, skipped, ...props}: ComponentProps) {
  let state: ButtonState = buttonState.unchecked;

  if (checked) {
    state = buttonState.checked;
  } else if (skipped) {
    state = buttonState.skipped;
  }

  return <button
    onClick={onClick}
    data-state={state}
    className={cn(
      'hover:bg-white/90 rounded-lg text-lg lg:text-3xl font-bold w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center relative bg-white/90',
      checked && 'opacity-30',
      skipped && 'opacity-60',
    )}
    disabled={disabled}
    {...props}>
    {type === tileType.bonus && <SquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
    {type === tileType.checkTwoInLowestRow && <CircleIcon className="h-full w-full absolute text-black p-[1px] "/>}
    {type === tileType.checkOneInAllRows && <RotatedSquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
    {type === tileType.lowestRowTimesTwo && <SquareIcon className="h-full w-full absolute text-black p-[2px]"/>}
    {type === tileType.plusThirteen && <OctagonIcon className="h-full w-full absolute text-black p-[1px]"/>}
    {type === tileType.failedRoundsDontCount && <StarIcon className="h-full w-full absolute text-black p-[1px]"/>}

    {skipped && <SkippedIcon className="h-full w-full absolute -z-10"/>}
    {checked && <CheckedIcon className="h-full w-full absolute -z-10"/>}
    { children }
  </button>
}
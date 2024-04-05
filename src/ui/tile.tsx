import { HTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';
import { CheckedIcon, SkippedIcon } from '@/ui/icons';

interface ComponentProps extends PropsWithChildren, HTMLAttributes<HTMLButtonElement> {
  bonus: boolean;
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

export default function Tile({ children, disabled, onClick, bonus, checked, skipped, ...props }: ComponentProps) {
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
      'hover:bg-white/90 rounded-lg text-xl lg:text-4xl font-bold w-8 h-8 lg:w-14 lg:h-14 flex items-center justify-center relative',
      checked && 'opacity-30',
      skipped && 'opacity-60',
      bonus ? 'ring-inset ring-2 lg:ring ring-offset-2 ring-black bg-white' : 'bg-white/90'
    )}
    disabled={disabled}
    {...props}>
    {skipped && <SkippedIcon className="h-full w-full absolute -z-10"/>}
    {checked && <CheckedIcon className="h-full w-full absolute -z-10"/>}
    { children }
  </button>
}
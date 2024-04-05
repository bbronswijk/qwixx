import { cn } from '@/utils/cn';
import React, { HTMLAttributes } from 'react';
import { CheckMarkIcon, UnLockedIcon, XIcon } from '@/ui/icons';

interface ComponentProps extends HTMLAttributes<HTMLButtonElement> {
  lockedBySomeoneElse: boolean;
  completedRow: boolean;
  onClick: () => void;
}

export const lockState = {
  completed: 'completed',
  unlocked: 'unlocked',
  locked: 'locked',
} as const;

type LockState = keyof typeof lockState;

export default function Lock({ lockedBySomeoneElse, completedRow, ...props }: ComponentProps) {
  const iconClass = 'h-4 w-4 lg:h-6 lg:w-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute';

  let icon = <UnLockedIcon className={cn(iconClass, '-rotate-12')}/>;
  let state: LockState = lockState.unlocked;

  if (completedRow) {
    icon = <CheckMarkIcon className={iconClass}/>;
    state = lockState.completed;
  } else if (lockedBySomeoneElse) {
    icon = <XIcon className={iconClass}/>;
    state = lockState.locked;
  }

  return (
    <button
      data-testid="lock"
      data-state={state}
      disabled={completedRow}
      {...props}
      className={cn(
        'bg-white/70 rounded-full h-8 w-8 p-1.5 mx-2 duration-300 relative',
        lockedBySomeoneElse && 'opacity-20',
        !lockedBySomeoneElse && !completedRow && 'opacity-50 [transform:rotateY(180deg)]',
        completedRow && ''
      )}>
      {icon}
    </button>
  );
}
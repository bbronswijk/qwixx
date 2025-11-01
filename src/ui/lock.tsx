import { cn } from "@/utils/cn";
import React, { HTMLAttributes } from "react";
import { CheckMarkIcon, UnLockedIcon, XIcon } from "@/ui/icons";
import { useGameCompleted } from "@/state/store";

interface ComponentProps extends HTMLAttributes<HTMLButtonElement> {
  lockedBySomeoneElse: boolean;
  lastItemIsSelected: boolean;
}

export const lockState = {
  completed: "completed",
  unlocked: "unlocked",
  locked: "locked",
} as const;

type LockState = keyof typeof lockState;

export default function Lock({ lockedBySomeoneElse, lastItemIsSelected, ...props }: ComponentProps) {
  const gameCompleted = useGameCompleted();
  const iconClass = "h-4 w-4 lg:h-6 lg:w-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 absolute";

  let icon = <UnLockedIcon className={cn(iconClass, "-rotate-12")} />;
  let state: LockState = lockState.unlocked;

  if (lastItemIsSelected) {
    icon = <CheckMarkIcon className={iconClass} />;
    state = lockState.completed;
  } else if (lockedBySomeoneElse) {
    icon = <XIcon className={iconClass} />;
    state = lockState.locked;
  }

  return (
    <button
      data-testid='lock'
      data-state={state}
      disabled={lastItemIsSelected || gameCompleted}
      {...props}
      className={cn(
        "relative mx-2 h-8 w-8 rounded-full bg-white/70 p-1.5 duration-200 lg:h-12 lg:w-12",
        lockedBySomeoneElse && "opacity-20",
        !lockedBySomeoneElse && !lastItemIsSelected && "opacity-50 [transform:rotateY(180deg)]"
      )}
    >
      {icon}
    </button>
  );
}

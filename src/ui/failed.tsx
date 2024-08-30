import React, { useEffect } from "react";
import { XIcon } from "@/ui/icons";
import { cn } from "@/utils/cn";
import QwixxStore from "@/state/store";
import { notifyImmediateEndOfGameAction } from "@/actions/pusher.actions";
import { useVariant } from "@/context/variant.context";
import { useGamePin } from "@/utils/use-game-pin.hook";

export default function Failed() {
  const failedRounds = QwixxStore.use.failed();
  const onFailRound = QwixxStore.use.roundFailed();
  const pin = useGamePin();
  const variant = useVariant();
  const gameCompleted = QwixxStore.use.gameCompleted();
  const disabled = failedRounds >= 4 || gameCompleted;

  useEffect(() => {
    if (failedRounds >= 4) {
      notifyImmediateEndOfGameAction(variant, pin);
    }
  }, [pin, failedRounds]);

  return (
    <>
      <button
        onClick={onFailRound}
        disabled={disabled}
        className={cn("h-8 whitespace-nowrap rounded border-2 border-slate-600 px-2 font-bold text-slate-600 lg:h-10 lg:border-4 lg:px-5", disabled && "opacity-40")}
      >
        Worp mislukt
      </button>

      {[1, 2, 3, 4].map((points) => (
        <div key={points} data-testid='failed-button' className='h-8 w-8 rounded border-4 border-slate-300 bg-white lg:h-10 lg:w-10'>
          {points <= failedRounds && <XIcon className='text-slate-700' />}
        </div>
      ))}
      <div data-testid='failed-total' className='flex h-8 w-8 items-center justify-center rounded bg-white font-bold lg:ml-4 lg:h-10 lg:w-10'>
        {failedRounds * -5}
      </div>
    </>
  );
}

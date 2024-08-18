import React, { useEffect } from 'react';
import { XIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
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
      <button onClick={onFailRound} disabled={disabled} className={
        cn('border-2 lg:border-4 border-slate-600 text-slate-600 font-bold h-8 lg:h-10 whitespace-nowrap px-2 lg:px-5 rounded', disabled && 'opacity-40')
      }>Worp mislukt</button>

      {[1, 2, 3, 4].map((points) => (
        <div key={points}
             data-testid="failed-button"
             className="bg-white border-4 border-slate-300 h-8 w-8 lg:h-10 lg:w-10 rounded">
          {points <= failedRounds && <XIcon className="text-slate-700"/>}
        </div>
      ))}
      <div data-testid="failed-total"
           className="flex items-center justify-center bg-white h-8 w-8 lg:h-10 lg:w-10 rounded lg:ml-4 font-bold">{failedRounds * -5}</div>
    </>
  );
}
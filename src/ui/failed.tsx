import React from 'react';
import { XIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';

interface ComponentProps {
  onFailRound: () => void;
  failedRounds: number;
}

export default function Failed({onFailRound, failedRounds}: ComponentProps) {
  const disabled = failedRounds >= 4;

  return (
    <>
      <button onClick={() => onFailRound()} disabled={disabled} className={
        cn('border-2 lg:border-4 border-slate-400 text-slate-400 font-bold h-8 lg:h-10 whitespace-nowrap px-2 lg:px-5 rounded', disabled && 'opacity-40')
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
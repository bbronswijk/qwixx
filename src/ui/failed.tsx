import React, { useState } from 'react';
import { XIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
import useQwixxStore from '@/state/useQwixxStore';

export default function Failed() {
  const failed = useQwixxStore.use.failed();
  const roundFailed = useQwixxStore.use.roundFailed();
  const disabled = failed >= 4;
  return (
    <>
      <button onClick={() => roundFailed()} disabled={disabled} className={
        cn("border-4 border-slate-400 text-slate-400 font-bold h-10 whitespace-nowrap px-3 lg:px-5 rounded", disabled && "opacity-40")
      }>Worp mislukt</button>
      {[1, 2, 3, 4].map((points) => (
        <div key={points}
             data-testid="failed-button"
             className="bg-white border-4 border-slate-300 h-10 w-10 rounded flex items-center justify-center">
          {points <= failed && <XIcon className="text-slate-700 hover:visible hover:opacity-40"/>}
        </div>
      ))}
      <div data-testid="failed-total" className="flex items-center justify-center bg-white h-10 w-10 rounded ml-2 lg:ml-4 font-bold">{failed * -5}</div>
    </>
  );
}
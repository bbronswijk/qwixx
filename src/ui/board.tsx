'use client';

import Row from '@/ui/row';
import React from 'react';
import Bonus from '@/ui/bonus';
import Failed from '@/ui/failed';
import { UndoIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
import useQwixxStore, { useTotalSelector } from '@/state/useQwixxStore';
import { colors, tiles } from '@/data/tiles';

export default function Board() {
  const userActions = useQwixxStore.use.userActions();
  const undo = useQwixxStore.use.undo();

  return <div className="px-8 py-4 lg:p-8 bg-slate-200 rounded-xl space-y-2 m-3">
    <Row color={colors.red} tiles={tiles.red} className="bg-red-800 text-red-800"/>
    <Row color={colors.yellow} tiles={tiles.yellow} className="bg-yellow-500 text-yellow-600"/>
    <Row color={colors.green} tiles={tiles.green} className="bg-green-700 text-green-700"/>
    <Row color={colors.blue} tiles={tiles.blue} className="bg-blue-800 text-blue-800"/>

    <Bonus/>

    <footer className="flex items-center py-0 lg:py-2 gap-2 lg:gap-4">
      <Failed/>

      <button
        data-testid="undo"
        onClick={() => undo()}
        disabled={userActions.length === 0}
        className={cn('bg-white h-8 w-8 lg:h-10 lg:w-10 rounded flex items-center justify-center ml-auto', userActions.length > 0 ? 'hover:bg-white/50' : 'opacity-30')}>
        <UndoIcon className={cn("text-slate-700")}/>
      </button>
      <div
        className="bg-white/70 rounded-lg px-2 lg:px-4 font-bold h-8 lg:h-12 flex items-center justify-center">
        <span className="text-slate-400 ml-auto font-bold text-lg lg:text-xl">Totaal</span>
        <span data-testid="score"
              className="text-black w-12 lg:w-16 text-right text-xl lg:text-4xl ">{useTotalSelector()}</span>
      </div>
    </footer>
  </div>
}
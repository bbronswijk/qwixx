import Row from '@/ui/row';
import React, { PropsWithChildren } from 'react';
import Failed from '@/ui/failed';
import { UndoIcon } from '@/ui/icons';
import { cn } from '@/utils/cn';
import { Color, colors } from '@/data/color';
import { CheckTileFn } from '@/state/store';
import { TileModel } from '@/data/tile.model';

interface ComponentProps extends PropsWithChildren {
  config: Record<Color, TileModel[]>;
  totalScore: number;
  hasMadeChanges: boolean;
  failedRounds: number;
  state: Record<Color, number[]>;
  onCheckTile: CheckTileFn;
  undoClicked: () => void;
  onFailRound: () => void;
}

export default function Board({
                                config,
                                undoClicked,
                                hasMadeChanges,
                                totalScore,
                                failedRounds,
                                onFailRound,
                                state,
                                onCheckTile,
                                children
                              }: ComponentProps) {
  return <div className="px-8 py-4 lg:p-8 bg-slate-200 rounded-xl space-y-2 m-3">
    <Row color={colors.red}
         tiles={config.red}
         selection={state[colors.red]}
         onCheckTile={onCheckTile}
         className="bg-red-800 text-red-800"/>
    <Row color={colors.yellow}
         tiles={config.yellow}
         selection={state[colors.yellow]}
         onCheckTile={onCheckTile}
         className="bg-yellow-500 text-yellow-600"/>
    <Row color={colors.green}
         tiles={config.green}
         selection={state[colors.green]}
         onCheckTile={onCheckTile}
         className="bg-green-700 text-green-700"/>
    <Row color={colors.blue}
         tiles={config.blue}
         selection={state[colors.blue]}
         onCheckTile={onCheckTile}
         className="bg-blue-800 text-blue-800"/>

    {children}

    <footer className="flex items-center py-0 lg:py-2 gap-2 lg:gap-4">
      <Failed failedRounds={failedRounds} onFailRound={onFailRound}/>

      <button
        data-testid="undo"
        onClick={undoClicked}
        disabled={!hasMadeChanges}
        className={cn('bg-white h-8 w-8 lg:h-10 lg:w-10 rounded flex items-center justify-center ml-auto', hasMadeChanges ? 'hover:bg-white/50' : 'opacity-30')}>
        <UndoIcon className={cn("text-slate-700")}/>
      </button>
      <div
        className="bg-white/70 rounded-lg px-2 lg:px-4 font-bold h-8 lg:h-12 flex items-center justify-center">
        <span className="text-slate-400 ml-auto font-bold text-lg lg:text-xl">Totaal</span>
        <span data-testid="score"
              className="text-black w-12 lg:w-16 text-right text-xl lg:text-4xl ">{totalScore}</span>
      </div>
    </footer>
  </div>
}
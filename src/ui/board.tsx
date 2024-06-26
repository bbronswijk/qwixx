import Row from '@/ui/row';
import React, { PropsWithChildren } from 'react';
import Failed from '@/ui/failed';
import { Color, colors } from '@/data/color';
import { CheckTileFn } from '@/state/store';
import { TileModel } from '@/data/tile.model';

interface ComponentProps extends PropsWithChildren {
  config: Record<Color, TileModel[]>;
  totalScore: number;
  hasMadeChanges: boolean;
  failedRounds: number;
  showScore: boolean;
  state: Record<Color, number[]>;
  lockedState: Record<Color, boolean>;
  onCheckTile: CheckTileFn;
  onLockedIconClicked: (color: Color) => void;
  undoClicked: () => void;
  onFailRound: () => void;
}

export default function Board({
                                config,
                                totalScore,
                                failedRounds,
                                onFailRound,
                                state,
                                showScore,
                                lockedState,
                                onCheckTile,
                                onLockedIconClicked,
                                children
                              }: ComponentProps) {
  return <div className="px-8 py-4 lg:p-8 bg-slate-200 rounded-xl space-y-2 m-3">
    <Row color={colors.red}
         tiles={config.red}
         showScore={showScore}
         selection={state[colors.red]}
         locked={lockedState[colors.red]}
         onCheckTile={onCheckTile}
         onLockedIconClicked={onLockedIconClicked}
         className="bg-red-800 text-red-800"/>
    <Row color={colors.yellow}
         tiles={config.yellow}
         showScore={showScore}
         selection={state[colors.yellow]}
         locked={lockedState[colors.yellow]}
         onCheckTile={onCheckTile}
         onLockedIconClicked={onLockedIconClicked}
         className="bg-yellow-500 text-yellow-600"/>
    <Row color={colors.green}
         tiles={config.green}
         showScore={showScore}
         selection={state[colors.green]}
         locked={lockedState[colors.green]}
         onCheckTile={onCheckTile}
         onLockedIconClicked={onLockedIconClicked}
         className="bg-green-700 text-green-700"/>
    <Row color={colors.blue}
         tiles={config.blue}
         showScore={showScore}
         selection={state[colors.blue]}
         locked={lockedState[colors.blue]}
         onCheckTile={onCheckTile}
         onLockedIconClicked={onLockedIconClicked}
         className="bg-blue-800 text-blue-800"/>

    {children}

    <footer className="flex items-center py-0 lg:py-2 gap-2 lg:gap-4">
      <Failed failedRounds={failedRounds} onFailRound={onFailRound}/>
      {showScore && <div
          className="bg-white/70 rounded-lg px-2 lg:px-4 font-bold h-8 lg:h-12 flex items-center justify-center ml-auto">
        <span className="text-slate-400 ml-auto font-bold text-lg lg:text-xl">Totaal</span>
        <span data-testid="score"
              className="text-black w-12 lg:w-16 text-right text-xl lg:text-4xl ">{totalScore}</span>
      </div>}
    </footer>
  </div>
}
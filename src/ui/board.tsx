import Row from '@/ui/row';
import React, { PropsWithChildren } from 'react';
import Failed from '@/ui/failed';
import { Color, colors } from '@/data/color';
import QwixxStore from '@/state/store';
import { TileModel } from '@/data/tile.model';
import { cn } from '@/utils/cn';

interface ComponentProps extends PropsWithChildren {
  config: Record<Color, TileModel[]>;
  totalScore: number;
}

export default function Board({config, totalScore, children}: ComponentProps) {
  const lockedState = QwixxStore.use.locked();
  const redSelection = QwixxStore.use.red();
  const yellowSelection = QwixxStore.use.yellow();
  const greenSelection = QwixxStore.use.green();
  const blueSelection = QwixxStore.use.blue();
  const showScore = QwixxStore.use.showScore();

  return <div className="px-8 py-4 lg:p-8 bg-slate-200 rounded-xl space-y-2 m-3">
    <Row color={colors.red}
         tiles={config.red}
         selection={redSelection}
         locked={lockedState[colors.red]}
         className="bg-red-800 text-red-800"/>
    <Row color={colors.yellow}
         tiles={config.yellow}
         selection={yellowSelection}
         locked={lockedState[colors.yellow]}
         className="bg-yellow-500 text-yellow-600"/>
    <Row color={colors.green}
         tiles={config.green}
         selection={greenSelection}
         locked={lockedState[colors.green]}
         className="bg-green-700 text-green-700"/>
    <Row color={colors.blue}
         tiles={config.blue}
         selection={blueSelection}
         locked={lockedState[colors.blue]}
         className="bg-blue-800 text-blue-800"/>

    {children}

    <footer className="flex items-center py-0 lg:py-2 gap-2 lg:gap-4">
      <Failed/>
      <div
        className={cn("bg-white/70 rounded-lg px-2 lg:px-4 font-bold h-8 lg:h-12 flex items-center justify-center ml-auto", !showScore && 'opacity-0')}>
        <span className="text-slate-400 ml-auto font-bold text-lg lg:text-xl">Totaal</span>
        <span data-testid="score"
              className="text-black w-12 lg:w-16 text-right text-xl lg:text-4xl">
          {totalScore}
        </span>
      </div>
    </footer>
  </div>
}
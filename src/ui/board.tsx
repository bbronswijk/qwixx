import Row from '@/ui/row';
import React, { PropsWithChildren, useEffect } from 'react';
import Failed from '@/ui/failed';
import { Color, colors } from '@/data/color';
import QwixxStore from '@/state/store';
import { TileModel } from '@/data/tile.model';
import { cn } from '@/utils/cn';
import { Dialog } from "@/ui/dialog";
import { usePusher } from "@/pusher/pusher.context";
import { GameOverDialogContent } from "@/ui/game-over-dialog-content";
import { endGameAction, shareScoreAction } from "@/actions/pusher.actions";
import { useParams } from "next/navigation";
import { useAuth } from "@/auth/authentication.context";
import { PusherEvent } from "@/pusher/pusher.model";
import { userCompleted2RowsSelector } from "@/state/selectors";

interface ComponentProps extends PropsWithChildren {
  config: Record<Color, TileModel[]>;
  totalScore: number;
}

export default function Board({config, totalScore, children}: ComponentProps) {
  const gameCompleted = QwixxStore.use.gameCompleted();
  const setGameCompleted = QwixxStore.use.setGameCompleted();
  const lockedState = QwixxStore.use.lockedBySomeoneElse();
  const redSelection = QwixxStore.use.red();
  const yellowSelection = QwixxStore.use.yellow();
  const greenSelection = QwixxStore.use.green();
  const blueSelection = QwixxStore.use.blue();
  const {channel} = usePusher();
  const showScore = QwixxStore.use.showScore();
  const userCompleted2Rows = QwixxStore(userCompleted2RowsSelector);
  const {roomId} = useParams<{ roomId: string }>()
  const {userName} = useAuth()

  // TODO can this be moved to the pusher context?
  //  we need to access useTotalSelector(defaultTiles) somehow
  useEffect(() => {
    channel?.bind(PusherEvent.endGame, () => {
      setGameCompleted();
      shareScoreAction(roomId, {score: totalScore, nickname: userName as string})
    });

    return () => {
      channel?.unbind(PusherEvent.endGame);
    }
  }, [totalScore, channel]);

  useEffect(() => {
    if (userCompleted2Rows) {
      endGameAction(roomId);
    }
  }, [roomId, userCompleted2Rows]);


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

    <Dialog open={gameCompleted}>
      <GameOverDialogContent/>
    </Dialog>
  </div>
}
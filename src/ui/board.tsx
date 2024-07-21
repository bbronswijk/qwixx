'use client';

import Row from '@/ui/row';
import React, { PropsWithChildren, useEffect } from 'react';
import Failed from '@/ui/failed';
import { Color, colors } from '@/data/color';
import QwixxStore from '@/state/store';
import { TileModel } from '@/data/tile.model';
import { Dialog } from "@/ui/dialog";
import { usePusher } from "@/pusher/pusher.context";
import { GameOverDialogContent } from "@/ui/game-over-dialog-content";
import { endGameAction, shareScoreAction } from "@/actions/pusher.actions";
import { useParams } from "next/navigation";
import { useAuth } from "@/auth/authentication.context";
import { PusherEvent } from "@/pusher/pusher.model";
import { userCompleted2RowsSelector } from "@/state/selectors";
import { useVariant } from "@/context/variant.context";
import { TotalScore } from "@/ui/totalScore";

interface ComponentProps extends PropsWithChildren {
  config: Record<Color, TileModel[]>;
  totalScore: number;
}

export default function Board({config, totalScore, children}: ComponentProps) {
  const gameCompleted = QwixxStore.use.gameCompleted();
  const setGameCompleted = QwixxStore.use.setGameCompleted();
  const lockedState = QwixxStore.use.lockedBySomeoneElse();
  const {channel} = usePusher();
  const userCompleted2Rows = QwixxStore(userCompleted2RowsSelector);
  const {roomId} = useParams<{ roomId: string }>()
  const {userName} = useAuth()
  const variant = useVariant();

  // TODO can this be moved to the pusher context?
  //  we need to access useTotalSelector(defaultTiles) somehow
  useEffect(() => {
    channel?.bind(PusherEvent.endGame, () => {
      setGameCompleted();
      shareScoreAction(variant, roomId, {score: totalScore, nickname: userName as string})
    });

    return () => {
      channel?.unbind(PusherEvent.endGame);
    }
  }, [totalScore, channel]);

  useEffect(() => {
    if (userCompleted2Rows) {
      endGameAction(variant, roomId);
    }
  }, [roomId, userCompleted2Rows]);


  return <div className="px-8 py-4 lg:p-8 bg-slate-200 rounded-xl space-y-2 m-3">
    <Row color={colors.red}
         tiles={config.red}
         locked={lockedState[colors.red]}
         className="bg-red-800 text-red-800"/>
    <Row color={colors.yellow}
         tiles={config.yellow}
         locked={lockedState[colors.yellow]}
         className="bg-yellow-500 text-yellow-600"/>
    <Row color={colors.green}
         tiles={config.green}
         locked={lockedState[colors.green]}
         className="bg-green-700 text-green-700"/>
    <Row color={colors.blue}
         tiles={config.blue}
         locked={lockedState[colors.blue]}
         className="bg-blue-800 text-blue-800"/>

    {children}

    <footer className="flex items-center py-0 lg:py-2 gap-2 lg:gap-4">
      <Failed/>
      <TotalScore totalScore={totalScore}/>
    </footer>

    <Dialog open={gameCompleted}>
      <GameOverDialogContent/>
    </Dialog>
  </div>
}
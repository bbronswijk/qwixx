'use client';

import Row from '@/ui/row';
import React, { PropsWithChildren, useEffect } from 'react';
import Failed from '@/ui/failed';
import { rows } from '@/data/color';
import { TotalScore } from "@/ui/totalScore";
import { Config } from "@/data/config.model";
import QwixxStore from "@/state/store";
import { usersCompleted2RowsSelector } from "@/state/selectors";
import { useGamePin } from "@/utils/use-game-pin.hook";
import { GameEndedBanner } from "@/ui/game-ended-banner";

interface ComponentProps extends PropsWithChildren {
  config: Config;
  totalScore: number;
}

export default function Board({config, totalScore, children}: ComponentProps) {
  const userCompleted2Rows = QwixxStore(usersCompleted2RowsSelector);
  const markAsGameCompleted = QwixxStore.use.markAsGameCompleted();
  const pin = useGamePin();

  useEffect(() => {
    if (userCompleted2Rows) {
      markAsGameCompleted();
    }
  }, [pin, userCompleted2Rows]);

  return (
    <div className="px-8 py-4 lg:p-8 bg-slate-200 rounded-xl space-y-2 m-3">
      <Row row={rows.a} tiles={config.a}/>
      <Row row={rows.b} tiles={config.b}/>
      <Row row={rows.c} tiles={config.c}/>
      <Row row={rows.d} tiles={config.d}/>

      {children}

      <footer className="flex items-center py-0 lg:py-2 gap-2 lg:gap-4">
        <Failed/>
        <TotalScore totalScore={totalScore}/>
      </footer>
      <GameEndedBanner totalScore={totalScore}/>
    </div>
  )
}
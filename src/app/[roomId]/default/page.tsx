'use client';

import Board from '@/ui/board';
import React, { useEffect } from 'react';
import { defaultTiles } from '@/app/[roomId]/default/default.config';
import { useTotalSelector } from '@/state/selectors';
import QwixxStore from '@/state/store';
import BackButton from '@/ui/back-button';
import UndoButton from '@/ui/undo-button';
import ToggleScoreButton from '@/ui/toggle-score-button';
import { Members } from "@/ui/members";

export default function Home() {
  const reset = QwixxStore.use.reset();

  useEffect(() => {
    reset();
  }, []);

  return (
    <main className="h-full w-full flex justify-center items-center">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
        <UndoButton/>
        <ToggleScoreButton/>
      </header>
      <Members className="space-y-2"/>
      <Board
        config={defaultTiles}
        totalScore={useTotalSelector(defaultTiles)}>
      </Board>
    </main>
  );
}

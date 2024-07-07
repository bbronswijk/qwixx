'use client';

import Board from '@/ui/board';
import Bonus from '@/app/variant-a/bonus';
import React, { useEffect } from 'react';
import QwixxStore from '@/state/store';
import { useTotalSelector } from '@/state/selectors';
import { variantATiles } from '@/app/variant-a/variant-a.config';
import BackButton from '@/ui/back-button';
import UndoButton from '@/ui/undo-button';
import ToggleScoreButton from '@/ui/toggle-score-button';

export default function Page() {
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
      <Board
        config={variantATiles}
        totalScore={useTotalSelector(variantATiles)}>
        <Bonus/>
      </Board>
    </main>
  );
}

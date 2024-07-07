'use client';

import Board from '@/ui/board';
import React, { useEffect } from 'react';
import QwixxStore from '@/state/store';
import { useTotalSelector } from '@/state/selectors';
import { variantBTiles } from '@/app/variant-b/variant-b.config';
import ExtraPoints from '@/app/variant-b/extra/extra-points';
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
        config={variantBTiles}
        totalScore={useTotalSelector(variantBTiles)}>
        <ExtraPoints/>
      </Board>
    </main>
  );
}

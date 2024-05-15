'use client';

import Board from '@/ui/board';
import React, { useEffect } from 'react';
import { defaultTiles } from '@/app/default/default.config';
import { useTotalSelector } from '@/state/selectors';
import QwixxStore from '@/state/store';

export default function Home() {
  const userActions = QwixxStore.use.changes();
  const reset = QwixxStore.use.reset();
  const undo = QwixxStore.use.undo();
  const failedRounds = QwixxStore.use.failed();
  const onFailRound = QwixxStore.use.roundFailed();
  const onCheckTile = QwixxStore.use.checkTile();
  const selected = QwixxStore();

  useEffect(() => {
    reset();
  }, []);

  return (
    <main className="h-full w-full flex justify-center items-center">
      <Board
        state={selected}
        onCheckTile={onCheckTile}
        config={defaultTiles}
        hasMadeChanges={userActions.length > 0}
        failedRounds={failedRounds}
        onFailRound={onFailRound}
        undoClicked={() => undo()}
        totalScore={useTotalSelector(defaultTiles)}>
      </Board>
    </main>
  );
}

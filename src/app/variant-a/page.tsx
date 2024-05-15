'use client';

import Board from '@/ui/board';
import Bonus from '@/app/variant-a/bonus';
import React, { useEffect } from 'react';
import QwixxStore from '@/state/store';
import { useTotalSelector } from '@/state/selectors';
import { variantATiles } from '@/app/variant-a/variant-a.config';

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
        onCheckTile={onCheckTile}
        state={selected}
        config={variantATiles}
        hasMadeChanges={userActions.length > 0}
        failedRounds={failedRounds}
        onFailRound={onFailRound}
        undoClicked={() => undo()}
        totalScore={useTotalSelector(variantATiles)}>
        <Bonus/>
      </Board>
    </main>
  );
}

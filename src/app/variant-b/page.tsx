'use client';

import Board from '@/ui/board';
import React, { useEffect } from 'react';
import QwixxStore from '@/state/store';
import { useTotalSelector } from '@/state/selectors';
import { variantBTiles } from '@/app/variant-b/variant-b.config';
import ExtraPoints from '@/app/variant-b/extra/extra-points';

export default function Home() {
  const userActions = QwixxStore.use.changes();
  const lockedState = QwixxStore.use.locked();
  const reset = QwixxStore.use.reset();
  const undo = QwixxStore.use.undo();
  const failedRounds = QwixxStore.use.failed();
  const onFailRound = QwixxStore.use.roundFailed();
  const onCheckTile = QwixxStore.use.checkTile();
  const toggleRowLocked = QwixxStore.use.toggleRowLocked();
  const selected = QwixxStore();

  useEffect(() => {
    reset();
  }, []);

  return (
    <main className="h-full w-full flex justify-center items-center">
      <Board
        state={selected}
        lockedState={lockedState}
        onCheckTile={onCheckTile}
        config={variantBTiles}
        hasMadeChanges={userActions.length > 0}
        failedRounds={failedRounds}
        onFailRound={onFailRound}
        undoClicked={() => undo()}
        onLockedIconClicked={toggleRowLocked}
        totalScore={useTotalSelector(variantBTiles)}>
        <ExtraPoints/>
      </Board>
    </main>
  );
}

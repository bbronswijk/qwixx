'use client';

import Board from '@/ui/board';
import React from 'react';
import { defaultTiles } from '@/app/default/default.config';
import { useTotalSelector } from '@/app/default/default.selectors';
import useDefaultStore from '@/app/default/default.store';

export default function Home() {
  const userActions = useDefaultStore.use.changes();
  const undo = useDefaultStore.use.undo();
  const failedRounds = useDefaultStore.use.failed();
  const onFailRound = useDefaultStore.use.roundFailed();
  const onCheckTile = useDefaultStore.use.checkTile();
  const selected = useDefaultStore();

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
        totalScore={useTotalSelector()}>
      </Board>
    </main>
  );
}

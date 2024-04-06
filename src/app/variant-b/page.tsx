'use client';

import Board from '@/ui/board';
import React from 'react';
import useVariantBStore from '@/app/variant-b/variant-b.store';
import { useTotalSelector } from '@/app/variant-b/variant-b.selectors';
import { variantBTiles } from '@/app/variant-b/variant-b.config';
import ExtraPoints from '@/app/variant-b/extra/extra-points';

export default function Home() {
  const userActions = useVariantBStore.use.changes();
  const undo = useVariantBStore.use.undo();
  const failedRounds = useVariantBStore.use.failed();
  const onFailRound = useVariantBStore.use.roundFailed();
  const onCheckTile = useVariantBStore.use.checkTile();
  const selected = useVariantBStore();

  return (
    <main className="h-full w-full flex justify-center items-center">
      <Board
        onCheckTile={onCheckTile}
        state={selected}
        config={variantBTiles}
        hasMadeChanges={userActions.length > 0}
        failedRounds={failedRounds}
        onFailRound={onFailRound}
        undoClicked={() => undo()}
        totalScore={useTotalSelector()}>
        <ExtraPoints/>
      </Board>
    </main>
  );
}

'use client';

import Board from '@/ui/board';
import Bonus from '@/app/variant-a/bonus';
import React from 'react';
import useVariantAStore from '@/app/variant-a/variant-a.store';
import { useTotalSelector } from '@/app/variant-a/variant-a.selectors';
import { variantATiles } from '@/app/variant-a/variant-a.config';
import FullScreen from '@/ui/full-screen';

export default function Home() {
  const userActions = useVariantAStore.use.changes();
  const undo = useVariantAStore.use.undo();
  const failedRounds = useVariantAStore.use.failed();
  const onFailRound = useVariantAStore.use.roundFailed();
  const onCheckTile = useVariantAStore.use.checkTile();
  const selected = useVariantAStore();

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
        totalScore={useTotalSelector()}>
        <Bonus/>
      </Board>
      <FullScreen/>
    </main>
  );
}

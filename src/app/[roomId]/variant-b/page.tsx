'use client';

import Board from '@/ui/board';
import React, { useEffect } from 'react';
import QwixxStore from '@/state/store';
import { useTotalSelector } from '@/state/selectors';
import { variantBTiles } from '@/app/[roomId]/variant-b/variant-b.config';
import ExtraPoints from '@/app/[roomId]/variant-b/extra/extra-points';
import BackButton from '@/ui/back-button';
import UndoButton from '@/ui/undo-button';
import ToggleScoreButton from '@/ui/toggle-score-button';
import { Members } from "@/ui/members";
import { Pusher } from "@/pusher/pusher.context";
import { Variant, VariantContext } from '@/pusher/variant.context';

export default function Page() {
  const reset = QwixxStore.use.reset();

  useEffect(() => {
    reset();
  }, []);

  return (
    <VariantContext.Provider value={Variant.VARIANT_B}>
      <Pusher>
        <main className="h-full w-full flex justify-center items-center">
          <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
            <BackButton/>
            <UndoButton/>
            <ToggleScoreButton/>
          </header>
          <Members className="space-y-2"/>
          <Board
            config={variantBTiles}
            totalScore={useTotalSelector(variantBTiles)}>
            <ExtraPoints/>
          </Board>
        </main>
      </Pusher>
    </VariantContext.Provider>
  );
}

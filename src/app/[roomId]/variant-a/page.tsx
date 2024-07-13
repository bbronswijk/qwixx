'use client';

import Board from '@/ui/board';
import Bonus from '@/app/[roomId]/variant-a/bonus';
import React from 'react';
import { useTotalSelector } from '@/state/selectors';
import { variantATiles } from '@/app/[roomId]/variant-a/variant-a.config';
import BackButton from '@/ui/back-button';
import UndoButton from '@/ui/undo-button';
import ToggleScoreButton from '@/ui/toggle-score-button';
import { Members } from "@/ui/members";
import { Pusher } from "@/pusher/pusher.context";
import { Variant, VariantContext } from "@/pusher/variant.context";

export default function Page() {
  return (
    <VariantContext.Provider value={Variant.VARIANT_B}>
      <Pusher>
        <main className="h-full w-full flex justify-center items-center">
          <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
            <BackButton/>
            <UndoButton/>
            <ToggleScoreButton/>
          </header>
          <Members/>
          <Board
            config={variantATiles}
            totalScore={useTotalSelector(variantATiles)}>
            <Bonus/>
          </Board>
        </main>
      </Pusher>
    </VariantContext.Provider>
  );
}

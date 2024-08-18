'use client';

import Board from '@/ui/board';
import React from 'react';
import { useTotalSelector } from '@/state/selectors';
import { variantBTiles } from '@/app/[gameId]/bonus-b/variant-b.config';
import ExtraPoints from '@/app/[gameId]/bonus-b/extra/extra-points';
import { Members } from "@/ui/members";
import { Pusher } from "@/pusher/pusher.context";
import { Variant, VariantContext } from '@/context/variant.context';
import { GameHeader } from "@/ui/game-header";
import type { Viewport } from "next";

export const viewport: Viewport = {
  themeColor: 'black',
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
}

export default function Page() {
  const totalScore = useTotalSelector(variantBTiles);

  return (
    <VariantContext.Provider value={Variant.BONUS_B}>
      <Pusher>
        <main className="h-full w-full grid grid-cols-[1fr_auto_1fr] justify-center items-center p-4">
          <GameHeader/>
          <Members/>
          <Board config={variantBTiles} totalScore={totalScore}>
            <ExtraPoints/>
          </Board>
        </main>
      </Pusher>
    </VariantContext.Provider>
  );
}

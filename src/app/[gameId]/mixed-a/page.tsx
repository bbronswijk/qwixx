'use client';

import Board from '@/ui/board';
import React from 'react';
import { useTotalSelector } from '@/state/selectors';
import { Members } from "@/ui/members";
import { Pusher } from "@/pusher/pusher.context";
import { Variant, VariantContext } from "@/context/variant.context";
import { mixedATiles } from "@/app/[gameId]/mixed-a/mixed-a.config";
import { GameHeader } from "@/ui/game-header";

export default function Home() {
  const totalScore = useTotalSelector(mixedATiles);

  return (
    <VariantContext.Provider value={Variant.DEFAULT}>
      <Pusher>
        <main className="h-full w-full grid grid-cols-[1fr_auto_1fr] justify-center items-center p-4">
          <GameHeader/>
          <Members/>
          <Board config={mixedATiles} totalScore={totalScore}/>
        </main>
      </Pusher>
    </VariantContext.Provider>

  );
}

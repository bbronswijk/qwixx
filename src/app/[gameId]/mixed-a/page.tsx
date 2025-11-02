"use client";

import Board from "@/ui/board";
import React from "react";
import { useTotalSelector } from "@/state/selectors";
import { Members } from "@/ui/members";
import { Pusher } from "@/pusher/pusher.context";
import { Variant, VariantContext } from "@/context/variant.context";
import { mixedATiles } from "@/app/[gameId]/mixed-a/mixed-a.config";
import { GameHeader } from "@/ui/game-header";
import type { Viewport } from "next";
import { TotalScoreContext } from "@/context/total-score.context";
import { StoreProvider } from "@/state/store";

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function Home() {
  return (
    <StoreProvider>
      <VariantContext.Provider value={Variant.DEFAULT}>
        <Pusher>
          <Game />
        </Pusher>
      </VariantContext.Provider>
    </StoreProvider>
  );
}

function Game() {
  const totalScore = useTotalSelector(mixedATiles);

  return (
    <TotalScoreContext.Provider value={totalScore}>
      <main className='grid h-full w-full grid-cols-[1fr_auto_1fr] items-center justify-center p-4'>
        <GameHeader />
        <Members />
        <Board config={mixedATiles} />
      </main>
    </TotalScoreContext.Provider>
  );
}

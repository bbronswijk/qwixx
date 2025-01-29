"use client";

import Board from "@/ui/board";
import React from "react";
import { useTotalSelector } from "@/state/selectors";
import { Members } from "@/ui/members";
import { Pusher } from "@/pusher/pusher.context";
import { Variant, VariantContext } from "@/context/variant.context";
import { GameHeader } from "@/ui/game-header";
import type { Viewport } from "next";
import { TotalScoreContext } from "@/context/total-score.context";
import { stepsTiles } from "@/app/[gameId]/steps/steps.config";

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function Home() {
  const totalScore = useTotalSelector(stepsTiles);

  return (
    <VariantContext.Provider value={Variant.STEPS}>
      <TotalScoreContext.Provider value={totalScore}>
        <Pusher>
          <main className='grid h-full w-full grid-cols-[1fr_auto_1fr] items-center justify-center p-4'>
            <GameHeader />
            <Members />
            <Board config={stepsTiles} />
          </main>
        </Pusher>
      </TotalScoreContext.Provider>
    </VariantContext.Provider>
  );
}

"use client";

import Board from "@/ui/board";
import Bonus from "@/app/[gameId]/bonus-a/bonus";
import React from "react";
import { useTotalSelector } from "@/state/selectors";
import { variantATiles } from "@/app/[gameId]/bonus-a/variant-a.config";
import { Members } from "@/ui/members";
import { Pusher } from "@/pusher/pusher.context";
import { Variant, VariantContext } from "@/context/variant.context";
import { GameHeader } from "@/ui/game-header";
import type { Viewport } from "next";
import { TotalScoreContext } from "@/context/total-score.context";

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function Page() {
  const totalScore = useTotalSelector(variantATiles);

  return (
    <VariantContext.Provider value={Variant.BONUS_A}>
      <TotalScoreContext.Provider value={totalScore}>
        <Pusher>
          <main className='grid h-full w-full grid-cols-[1fr_auto_1fr] items-center justify-center p-4'>
            <GameHeader />
            <Members />
            <Board config={variantATiles}>
              <Bonus />
            </Board>
          </main>
        </Pusher>
      </TotalScoreContext.Provider>
    </VariantContext.Provider>
  );
}

"use client";

import type { Viewport } from "next";
import { generateConfiguration } from "@/app/[gameId]/steps/generate-configuration.utils";
import { useTotalSelector } from "@/state/selectors";
import { Variant, VariantContext } from "@/context/variant.context";
import { TotalScoreContext } from "@/context/total-score.context";
import { Pusher } from "@/pusher/pusher.context";
import { GameHeader } from "@/ui/game-header";
import { Members } from "@/ui/members";
import Board from "@/ui/board";
import React from "react";
import { Config } from "@/data/config.model";
import { useConfigurationIndexHook } from "@/utils/use-configuration-index.hook";
import { SelectedBlackTiles } from "@/app/[gameId]/steps/SelectedBlackTiles";

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function Page() {
  return (
    <VariantContext.Provider value={Variant.STEPS}>
      <Pusher>
        <WithConfig />
      </Pusher>
    </VariantContext.Provider>
  );
}

const WithConfig = () => {
  const configurationIndex = useConfigurationIndexHook();

  return <Game config={generateConfiguration(configurationIndex)} />;
};

const Game = ({ config }: { config: Config }) => {
  const totalScore = useTotalSelector(config);

  return (
    <TotalScoreContext.Provider value={totalScore}>
      <main className='grid h-full w-full grid-cols-[1fr_auto_1fr] items-center justify-center p-4'>
        <GameHeader />
        <Members />
        <Board config={config}>
          <SelectedBlackTiles config={config} />
        </Board>
      </main>
    </TotalScoreContext.Provider>
  );
};

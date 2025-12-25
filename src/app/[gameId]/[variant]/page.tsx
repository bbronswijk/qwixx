"use client";

import type { Viewport } from "next";
import { useVariant, Variant, VariantContext } from "@/context/variant.context";
import { Pusher } from "@/pusher/pusher.context";
import { GameHeader } from "@/ui/game-header";
import { Members } from "@/ui/members";
import Board from "@/ui/board";
import React from "react";
import { StoreProvider } from "@/state/store";
import { ConfigurationProvider } from "@/context/configuration.context";
import { useParams } from "next/navigation";
import { useConfigurationIndex } from "@/utils/use-configuration-index.hook";
import { GamePinProvider } from "@/context/game-pin.context";
import { ErrorBoundary } from "@/app/[gameId]/[variant]/ErrorBoundary";
import { GameEndedBanner } from "@/ui/game-ended-banner";

export default function Page() {
  const { gameId, variant } = useParams<{ gameId: string; variant: Variant }>();

  return (
    <StoreProvider enablePersist>
      <VariantContext.Provider value={variant}>
        <GamePinProvider gameId={Number(gameId)}>
          <Pusher>
            <Game />
          </Pusher>
        </GamePinProvider>
      </VariantContext.Provider>
    </StoreProvider>
  );
}

function Game() {
  const configurationIndex = useConfigurationIndex();
  const variant = useVariant();

  return (
    <ConfigurationProvider variant={variant} configurationIndex={configurationIndex}>
      <ErrorBoundary>
        <main className='grid h-full w-full grid-cols-[1fr_auto_1fr] items-center justify-center p-4'>
          <GameHeader />
          <Members />
          <Board />
          <GameEndedBanner />
        </main>
      </ErrorBoundary>
    </ConfigurationProvider>
  );
}

"use client";

import { State, StoreProvider } from "@/state/store";
import React from "react";
import { PlayerGameScore } from "@prisma/client";
import { Variant, VariantContext } from "@/context/variant.context";
import { ConfigurationProvider } from "@/context/configuration.context";
import { GamePinProvider } from "@/context/game-pin.context";
import Board from "@/ui/board";

type Props = {
  playerGameScore: PlayerGameScore;
  configIndex: number;
  gamePin: number;
  variant: Variant;
};

export function Preview({ playerGameScore, configIndex, gamePin, variant }: Props) {
  if (!playerGameScore.state) {
    return null;
  }

  const state = JSON.parse(playerGameScore.state as string) as State;

  return (
    <StoreProvider
      key={playerGameScore.nickname}
      initialState={{
        ...state,
        gameCompleted: true, // Freeze the board, some players might not have finished the game
      }}
    >
      <VariantContext.Provider value={variant}>
        <GamePinProvider gameId={gamePin}>
          <ConfigurationProvider variant={variant} configurationIndex={configIndex}>
            <Board />
          </ConfigurationProvider>
        </GamePinProvider>
      </VariantContext.Provider>
    </StoreProvider>
  );
}

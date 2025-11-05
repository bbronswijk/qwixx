"use client";

import React, { createContext, useContext } from "react";

const GamePinContext = createContext<number | undefined>(undefined);

interface GamePinProviderProps {
  gameId: number;
  children: React.ReactNode;
}

export function GamePinProvider({ gameId, children }: GamePinProviderProps) {
  return <GamePinContext.Provider value={gameId}>{children}</GamePinContext.Provider>;
}

export function useGamePin(): number {
  const gameId = useContext(GamePinContext);

  if (gameId === undefined) {
    throw new Error("useGamePin must be used within a GamePinProvider");
  }

  return gameId;
}

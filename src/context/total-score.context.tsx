"use client";

import { createContext, useContext } from "react";

export const TotalScoreContext = createContext<number>(0);

export const useTotalScore = (): number => {
  const context = useContext(TotalScoreContext);

  if (context === undefined) {
    throw new Error("TotalScoreContext has not been initialized.");
  }

  return context;
};

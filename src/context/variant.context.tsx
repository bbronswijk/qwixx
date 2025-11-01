"use client";

import { createContext, useContext } from "react";

export enum Variant {
  DEFAULT = "default",
  BONUS_A = "bonus-a",
  BONUS_B = "bonus-b",
  MIXED_A = "mixed-a",
  MIXED_B = "mixed-b",
  STEPS = "steps",
  CONNECTED = "connected",
}

export const VariantContext = createContext<Variant | null>(null);

export const useVariant = () => {
  const context = useContext(VariantContext);

  if (!context) {
    throw new Error("VariantContext has not been initialized.");
  }

  return context;
};

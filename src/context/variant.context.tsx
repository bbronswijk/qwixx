'use client'

import { createContext, useContext } from "react";

export enum Variant {
  DEFAULT = 'default',
  VARIANT_A = 'variant-a',
  VARIANT_B = 'variant-b',
}

export const VariantContext = createContext<Variant | null>(null);

export const useVariant = () => {
  const context = useContext(VariantContext);

  if (!context) {
    throw new Error('VariantContext has not been initialized.');
  }

  return context;
};



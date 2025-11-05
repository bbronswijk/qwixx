"use client";

import { createContext, PropsWithChildren, useContext } from "react";
import { Variant } from "@/context/variant.context";
import { Config } from "@/data/config.model";
import { generateConfiguration as generateConfigurationConnected } from "@/app/[gameId]/[variant]/connected/generate-configuration.utils";
import { generateConfiguration as generateConfigurationSteps } from "@/app/[gameId]/[variant]/steps/generate-configuration.utils";
import { variantATiles } from "@/app/[gameId]/[variant]/bonus-a/variant-a.config";
import { variantBTiles } from "@/app/[gameId]/[variant]/bonus-b/variant-b.config";
import { mixedATiles } from "@/app/[gameId]/[variant]/mixed-a/mixed-a.config";
import { defaultTiles } from "@/app/[gameId]/[variant]/default/default.config";

const ConfigurationContext = createContext<Config | undefined>(undefined);

type ConfigInput =
  | {
      variant: Extract<Variant, Variant.STEPS | Variant.CONNECTED>;
      configurationIndex: number;
    }
  | {
      variant: Extract<Variant, Variant.BONUS_A | Variant.BONUS_B | Variant.MIXED_A | Variant.DEFAULT>;
    };

/**
 * Create a separate context, because the configuration can come from the DB or the URL.
 */
export function ConfigurationProvider({ children, ...props }: PropsWithChildren<ConfigInput>) {
  const config = generateConfig(props);

  return <ConfigurationContext.Provider value={config}>{children}</ConfigurationContext.Provider>;
}

const generateConfig = (input: ConfigInput): Config => {
  switch (input.variant) {
    case Variant.BONUS_A:
      return variantATiles;
    case Variant.BONUS_B:
      return variantBTiles;
    case Variant.MIXED_A:
      return mixedATiles;
    case Variant.STEPS:
      return generateConfigurationSteps(input.configurationIndex);
    case Variant.CONNECTED:
      return generateConfigurationConnected(input.configurationIndex);
    case Variant.DEFAULT:
      return defaultTiles;
  }
};

export function useConfiguration() {
  const context = useContext(ConfigurationContext);

  if (!context) {
    throw new Error("useConfiguration must be used within a ConfigurationProvider");
  }

  return context;
}

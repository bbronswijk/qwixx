import { Variant } from "@/context/variant.context";

export const humanReadableVariant = (variant: Variant | string): string => {
  switch (variant) {
    case Variant.DEFAULT:
    case "default":
      return "Standaard";
    case Variant.BONUS_A:
    case "bonus-a":
      return "Bonus variant A";
    case Variant.BONUS_B:
    case "bonus-b":
      return "Bonus variant B";
    case Variant.MIXED_A:
    case "mixed-a":
      return "Mix variant A";
    case Variant.MIXED_B:
    case "mixed-b":
      return "Mix variant B";
    case Variant.STEPS:
    case "steps":
      return "Steps";
    default:
      return "Onbekend";
  }
};

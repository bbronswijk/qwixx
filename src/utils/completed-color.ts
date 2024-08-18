import { State } from "@/state/store";
import { Color, colors } from "@/data/color";

/**
 * Required for mixed variant A
 */
export const completedColor = (selection: State['selection'], color: Color): boolean => {
  switch (color) {
    case colors.red:
      return selection.a.includes(12);
    case colors.yellow:
      return selection.b.includes(12);
    case colors.green:
      return selection.c.includes(2);
    case colors.blue:
      return selection.d.includes(2);
  }
};
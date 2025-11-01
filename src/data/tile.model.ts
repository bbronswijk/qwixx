import { Color, Row } from "@/data/color";

export type TileModel =
  | {
      color: Color;
      value: number;
      type: Exclude<NumericTileType, "connected">;
    }
  | {
      color: Color;
      value: number;
      type: Extract<TileType, "connected">;
      connectedTo: ConnectedTo;
    };

export type ConnectedTo = { color: Color; row: Row; value: number; direction: Direction };

export type NumericTileType = Exclude<TileType, "failed" | "lock">;
export type FailedTileType = Extract<TileType, "failed">;
export type LockTileType = Extract<TileType, "lock">;

export const tileType = {
  default: "default",
  lock: "lock",
  failed: "failed",
  bonus: "bonus",
  checkTwoInLowestRow: "checkTwoInLowestRow",
  checkOneInAllRows: "checkOneInAllRows",
  lowestRowTimesTwo: "lowestRowTimesTwo",
  plusThirteen: "plusThirteen",
  failedRoundsDontCount: "failedRoundsDontCount",
  step: "step",
  connected: "connected",
} as const;

export type TileType = keyof typeof tileType;

export const buttonState = {
  unchecked: "unchecked",
  checked: "checked",
  skipped: "skipped",
} as const;

export enum Direction {
  up = "up",
  down = "down",
}

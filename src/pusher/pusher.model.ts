import { Color } from "@/data/color";

export enum PusherEvent {
  endGame = "game-end",
  shareScore = "send-score",
}

export interface PusherLockRowPayload {
  color: Color;
}

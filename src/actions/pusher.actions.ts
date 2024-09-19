"use server";

import { pusher } from "@/pusher/pusher";
import { PusherEvent } from "@/pusher/pusher-event.enum";
import { Variant } from "@/context/variant.context";
import { State } from "@/state/store";
import { endGameAction, saveScore } from "@/actions/game.actions";

export async function notifyUserEndedGameAction(variant: Variant, gamePin: number, store: State, score: number, nickname: string) {
  await Promise.all([endGameAction(gamePin), saveScore(gamePin, nickname, score, store)]);

  await pusher.trigger(`presence-${gamePin}-${variant}`, PusherEvent.userEndedGame, {
    ended: true,
  });
}

export async function notifyScoreSavedAction(variant: Variant, pin: number, store: State, score: number, nickname: string) {
  await saveScore(pin, nickname, score, store);

  await pusher.trigger(`presence-${pin}-${variant}`, PusherEvent.userSharedScore, {
    nickname,
    score,
  });
}

'use server'

import { pusher } from '@/pusher/pusher';
import { PusherEvent } from '@/pusher/pusher.model';
import { Variant } from "@/context/variant.context";
import { State } from "@/state/store";
import { endGameAction, saveScore } from "@/actions/game.actions";


export async function notifyImmediateEndOfGameAction(variant: Variant, gamePin: number) {
  await endGameAction(gamePin);

  await pusher.trigger(`presence-${gamePin}-${variant}`, PusherEvent.endGame, {ended: true});
}

export async function notifyScoreSharedAction(variant: Variant, pin: number, store: State, score: number, nickname: string) {
  await saveScore(pin, nickname, score, store);

  await pusher.trigger(`presence-${pin}-${variant}`, PusherEvent.shareScore, {nickname, score});
}


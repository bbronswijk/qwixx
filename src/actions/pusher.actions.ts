'use server'

import { pusher } from '@/pusher/pusher';
import { PusherEvent, PusherLockRowPayload, PusherShareScorePayload } from '@/pusher/pusher.model';
import { Variant } from "@/context/variant.context";

export async function triggerLockAction(socketId: string, variant: Variant, roomId: string | undefined, payload: PusherLockRowPayload) {
  if (!roomId) {
    throw new Error('No room id provided');
  }

  await pusher.trigger(`presence-${roomId}-${variant}`, PusherEvent.lockRow, payload, {socket_id: socketId});
}

export async function endGameAction(variant: Variant, roomId: string | undefined) {
  if (!roomId) {
    throw new Error('No room id provided');
  }

  await pusher.trigger(`presence-${roomId}-${variant}`, PusherEvent.endGame, {ended: true});
}

export async function shareScoreAction(variant: Variant, roomId: string | undefined, payload: PusherShareScorePayload) {
  if (!roomId) {
    throw new Error('No room id provided');
  }

  await pusher.trigger(`presence-${roomId}-${variant}`, PusherEvent.shareScore, payload);
}


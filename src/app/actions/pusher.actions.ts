'use server'

import { pusher } from '@/pusher/pusher';
import { PusherEvent, PusherLockRowPayload, PusherShareScorePayload } from '@/pusher/pusher.model';

export async function triggerLockAction(socketId: string, roomId: string | undefined, payload: PusherLockRowPayload) {
  if (!roomId) {
    throw new Error('No room id provided');
  }

  await pusher.trigger(`presence-${roomId}`, PusherEvent.lockRow, payload, {socket_id: socketId});
}


export async function endGameAction(roomId: string | undefined) {
  if (!roomId) {
    throw new Error('No room id provided');
  }

  await pusher.trigger(`presence-${roomId}`, PusherEvent.endGame, {ended: true});
}

export async function shareScoreAction(roomId: string | undefined, payload: PusherShareScorePayload) {
  if (!roomId) {
    throw new Error('No room id provided');
  }

  await pusher.trigger(`presence-${roomId}`, PusherEvent.shareScore, payload);
}


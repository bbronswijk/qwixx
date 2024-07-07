'use server'

import { pusher } from '@/pusher/pusher';
import { PusherEvent, PusherLockRowPayload } from '@/pusher/pusher.model';

export async function triggerLockAction(socketId: string, roomId: string | undefined, payload: PusherLockRowPayload) {
  if (!roomId) {
    return;
  }

  pusher.trigger(`presence-${roomId}`, PusherEvent.lockRow, payload, {socket_id: socketId});
}


import { Color } from '@/data/color';

export enum PusherEvent {
  lockRow = 'lock-row',
  unlockRow = 'unlock-row',
  gameEnd = 'game-end',
  sendScore = 'send-score',
}

export interface PusherLockRowPayload {
  color: Color;
}
import { Color } from '@/data/color';

export enum PusherEvent {
  lockRow = 'lock-row',
  endGame = 'game-end',
  shareScore = 'send-score',
}

export interface PusherLockRowPayload {
  color: Color;
}

export interface PusherShareScorePayload {
  score: number;
  nickname: string;
}
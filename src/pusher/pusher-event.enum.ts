export enum PusherEvent {
  userEndedGame = "user-ended-game",
  userSharedScore = "user-shared-score",
  userRolledDice = "user-rolled-dice",
}

export type UserRolledDicePayload = { nickname: string; dices: [number, number] };

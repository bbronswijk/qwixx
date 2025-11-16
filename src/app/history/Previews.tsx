"use client";

import { Preview } from "@/app/history/Preview";
import { getMemberIndex } from "@/utils/use-configuration-index.hook";
import { Variant } from "@/context/variant.context";
import { Game, PlayerGameScore } from "@prisma/client";
import { useEffect, useState } from "react";

export function Previews({ game }: { game: Game & { scores: PlayerGameScore[] } }) {
  return (
    <>
      {game.scores
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .map((playerGameScore) => (
          <Preview
            key={playerGameScore.nickname}
            playerGameScore={playerGameScore}
            configIndex={getMemberIndex(playerGameScore.nickname, game.scores, game.pin)}
            variant={game.variant as Variant}
            gamePin={game.pin}
          />
        ))}
    </>
  );
}

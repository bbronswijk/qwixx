"use client";

import { Preview } from "@/app/history/Preview";
import { getMemberIndex } from "@/utils/use-configuration-index.hook";
import { Variant } from "@/context/variant.context";
import { Game, PlayerGameScore } from "@prisma/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/ui/carousel";

export function Previews({ game }: { game: Game & { scores: PlayerGameScore[] } }) {
  return (
    <Carousel>
      <CarouselContent>
        {game.scores
          .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
          .map((playerGameScore) => (
            <CarouselItem key={playerGameScore.nickname} className='w-fit max-w-[100svw]'>
              <div className='mx-auto w-fit'>
                <Preview
                  playerGameScore={playerGameScore}
                  configIndex={getMemberIndex(playerGameScore.nickname, game.scores, game.pin)}
                  variant={game.variant as Variant}
                  gamePin={game.pin}
                />
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

import { GameStats } from "@/actions/game.actions";
import { MemberAvatar } from "@/ui/MemberAvatar";
import { Card, CardContent } from "@/ui/card";
import { CarouselItem } from "@/ui/carousel";
import Image from "next/image";
import { Button } from "@/ui/button";

type Props = {
  image: string;
  title: string;
  beta?: boolean;
  stats?: GameStats;
  onClick: () => void;
};

export const GameCard = ({ onClick, image, title, beta, stats }: Props) => (
  <CarouselItem className='h-[80dvh] basis-4/5 landscape:h-[70dvh]'>
    <Card className='relative h-full overflow-hidden rounded-3xl bg-slate-100' data-testId='create-game-card'>
      <Image
        src={image}
        alt=''
        className='absolute bottom-1/3 min-w-[350%] -rotate-[15deg] landscape:hidden'
        style={{ maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)" }}
        width={382 * 3}
        height={173 * 3}
        priority
      />
      <CardContent className='flex h-full flex-col justify-end p-6'>
        <h2 className='z-10 mb-7 flex items-center justify-center whitespace-nowrap text-center text-4xl font-bold'>{title}</h2>

        {!!stats && (
          <>
            <p className='mb-2 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground'>Highest Score</p>
            <div className='flex items-center gap-x-3'>
              <MemberAvatar nickName={stats.nickname} height={40} width={40} />
              <div className='text-left'>
                <p className='whitespace-nowrap text-lg font-bold leading-tight text-primary'>{stats.highestScore} points</p>
                <p className='text-sm font-semibold leading-tight text-card-foreground'>{stats.nickname}</p>
              </div>
            </div>
          </>
        )}

        <Button className='z-10 mt-7' onClick={onClick}>
          Create game
        </Button>
      </CardContent>
    </Card>
  </CarouselItem>
);

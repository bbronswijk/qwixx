import Image from "next/image";
import BackButton from "@/ui/back-button";
import db from "../../../prisma/db";
import { differenceInMinutes, format } from "date-fns";
import { nl } from "date-fns/locale/nl";
import { humanReadableVariant } from "@/utils/human-readable-variant";
import { Previews } from "@/app/history/Previews";

export default async function Page() {
  const games = await db.game.findMany({
    where: { finishedAt: { not: null } },
    orderBy: { finishedAt: "desc" },
    include: { scores: true },
  });

  return (
    <main className='min-h-full w-full bg-slate-100 p-4'>
      <header className='grid w-full grid-cols-3 items-center justify-between'>
        <BackButton />
        <h1 className='text-center text-2xl font-bold'>Leaderboard</h1>
      </header>

      <div className='mx-auto w-fit space-y-4'>
        {games.map((game) => (
          <article key={game.id} className='mx-auto w-full max-w-[] rounded-2xl border bg-white p-8'>
            <h2 className='flex items-center justify-between text-2xl font-bold leading-none'>
              {humanReadableVariant(game.variant)}
              <span className='rounded bg-slate-200 px-2 text-lg'>{game.pin}</span>
            </h2>
            <div className='mt-2 flex justify-between text-muted-foreground'>
              <span>{format(game.finishedAt!, "H:mm, PP", { locale: nl })}</span>
              <span>{differenceInMinutes(game.finishedAt!, game.createdAt)} minutes</span>
            </div>

            <hr className='my-4' />

            {game.scores
              .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
              .map((member) => (
                <div key={member.nickname} className='mt-2 flex items-center gap-4 text-xl font-bold'>
                  <Image src={`https://avatar.iran.liara.run/username?username=${member.nickname}`} alt={member.nickname} height={40} width={40} />
                  <span>{member.nickname}</span>
                  {member.score !== null ? <span className='ml-auto'>{member.score} points</span> : <span className='ml-auto'>unknown</span>}
                </div>
              ))}

            <Previews game={game} />
          </article>
        ))}
      </div>
    </main>
  );
}

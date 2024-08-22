import React from 'react';
import Image from "next/image";
import BackButton from "@/ui/back-button";
import db from "../../../prisma/db";
import { differenceInMinutes, format } from "date-fns";
import { nl } from "date-fns/locale/nl";
import { humanReadableVariant } from "@/utils/human-readable-variant";


export default async function Page() {
  const games = await db.game.findMany({
    where: {finishedAt: {not: null}},
    orderBy: {finishedAt: 'desc'},
    include: {scores: true},
  })

  return (
    <main className="min-h-full space-y-4 w-full bg-slate-100 p-4">
      <header className="w-full grid grid-cols-3 items-center justify-between">
        <BackButton/>
        <h1 className="text-2xl font-bold text-center ">History</h1>
      </header>


      {games.map((game) => (
        <article key={game.id} className="border rounded-2xl p-8 bg-white max-w-96 w-full mx-auto">
          <h2 className="flex font-bold text-2xl items-center justify-between leading-none">
            {humanReadableVariant(game.variant)}
            <span className="rounded bg-slate-200 px-2 text-lg">{game.pin}</span>
          </h2>
          <div className="flex justify-between text-muted-foreground mt-2">
            <span>{format(game.finishedAt!, 'H:mm, PP', {locale: nl})}</span>
            <span>{differenceInMinutes(game.finishedAt!, game.createdAt)} minutes</span>
          </div>

          <hr className="my-4"/>

          {game.scores
            .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
            .map((member) => (
              <div key={member.nickname} className="flex items-center gap-4 font-bold text-xl mt-2">
                <Image src={`https://avatar.iran.liara.run/username?username=${member.nickname}`}
                       alt={member.nickname}
                       height={40} width={40}/>
                <span>{member.nickname}</span>
                {member.score !== null
                  ? <span className="ml-auto">{member.score} punten</span>
                  : <span className="ml-auto">unknown</span>
                }
              </div>
            ))}
        </article>
      ))}
    </main>
  );
}

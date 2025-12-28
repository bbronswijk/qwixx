import BackButton from "@/ui/back-button";
import { db } from "../../../prisma/db";
import { differenceInMinutes, format } from "date-fns";
import { nl } from "date-fns/locale/nl";
import { humanReadableVariant } from "@/utils/human-readable-variant";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/ui/accordion";
import { Preview } from "@/app/history/Preview";
import { getMemberIndex } from "@/utils/use-configuration-index.hook";
import { Variant } from "@/context/variant.context";

export default async function Page() {
  const games = await db.game.findMany({
    where: { finishedAt: { not: null } },
    orderBy: { finishedAt: "desc" },
    include: { scores: true },
  });

  return (
    <main className='min-h-full bg-slate-100 p-4'>
      <header className='mb-6 grid w-full grid-cols-3 items-center justify-between'>
        <BackButton />
        <h1 className='text-center text-2xl font-bold'>Scores</h1>
      </header>

      <div className='max-w-full space-y-4'>
        {games.map((game) => (
          <Accordion type='multiple' key={game.id} className='max-w-full rounded-2xl border bg-white p-8'>
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
              .map((score, index) => (
                <AccordionItem value={score.nickname} key={score.nickname} className='mt-2 rounded-2xl border bg-slate-100'>
                  <AccordionTrigger className='flex items-center gap-2 rounded-2xl p-4 text-2xl font-black hover:no-underline active:no-underline'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-3xl font-bold text-slate-400'>
                      {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                    </div>
                    <span className='mr-auto text-2xl font-black'>{score.nickname}</span>
                    <span className='text-2xl font-black'>{score.score !== null ? `${score.score} points` : "unknown"}</span>
                  </AccordionTrigger>
                  <AccordionContent className='flex justify-center'>
                    <Preview playerGameScore={score} configIndex={getMemberIndex(score.nickname, game.scores, game.pin)} variant={game.variant as Variant} gamePin={game.pin} />
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        ))}
      </div>
    </main>
  );
}

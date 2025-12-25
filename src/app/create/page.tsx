import BackButton from "@/ui/back-button";
import { Games } from "@/app/create/Games";
import { getGameStats } from "@/actions/game.actions";

export default async function Home() {
  const gameStats = await getGameStats();

  return (
    <main className='flex min-h-full flex-col bg-white'>
      <header className='fixed left-3 right-3 top-3 flex items-center justify-between gap-3'>
        <BackButton />
      </header>

      <h1 className='col-span-2 py-8 text-center text-2xl font-bold'>Choose a game</h1>

      <Games gameStats={gameStats} />
    </main>
  );
}

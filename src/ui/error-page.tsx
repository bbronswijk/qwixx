import { Variant, VariantContext } from "@/context/variant.context";
import { BugIcon, LoaderIcon } from "@/ui/icons";
import { Button, buttonVariants } from "@/ui/button";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { notifyUserEndedGameAction } from "@/actions/pusher.actions";
import { useAuth } from "@/auth/authentication.context";
import { useActions, useGameState } from "@/state/store";
import { useGamePin } from "@/utils/use-game-pin.hook";
import { useEffect, useState } from "react";
import { saveChanges } from "@/actions/game.actions";

interface ComponentProps {
  variant: Variant;
  totalScore: number;
  reset: () => void;
}

export const UnExpectedError = ({ variant, totalScore, reset }: ComponentProps) => {
  const [gameEnded, setGameEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const { nickname } = useAuth();
  const { undo } = useActions();
  const store = useGameState();
  const pin = useGamePin();

  useEffect(() => {
    saveChanges(pin, nickname as string, store);
  }, []);

  const handleUndo = () => {
    undo();
    reset();
  };

  const handleEndGame = async () => {
    setLoading(true);
    await notifyUserEndedGameAction(variant, pin, store, totalScore, nickname as string);
    setLoading(false);
    setGameEnded(true);
  };

  let content = (
    <>
      <Button variant='default' className='w-full' onClick={handleUndo}>
        Undo last action
      </Button>
      <Button variant='ghost' className='w-full' onClick={handleEndGame}>
        End the game
      </Button>
    </>
  );

  if (loading) {
    content = <LoaderIcon className='mx-auto h-10 w-10 animate-spin' />;
  }

  if (gameEnded) {
    content = (
      <>
        <Link href='/create' className={cn(buttonVariants({ variant: "default" }), "w-full")}>
          Create new game
        </Link>
        <Link href='/join-existing' className={cn(buttonVariants({ variant: "ghost" }), "w-full")}>
          Or join an existing game
        </Link>
      </>
    );
  }

  return (
    <VariantContext.Provider value={variant}>
      <main className='flex h-full w-full items-center justify-center bg-red-600 p-4'>
        <div className='m-3 space-y-2 rounded-xl border bg-white px-12 py-4 text-center'>
          <BugIcon className='mx-auto mt-4 h-16 w-16 rotate-12 opacity-30' />
          <section className='space-y-4 pb-4'>
            <h1 className='text-4xl font-bold'>Unexpected Error</h1>
            <p className='max-w-96 leading-relaxed'>
              It looks like you&lsquo;ve encountered an unexpected bug. You can try undoing your last action and choosing a different one, or you can choose to end the game.
            </p>
          </section>

          {content}
        </div>
      </main>
    </VariantContext.Provider>
  );
};

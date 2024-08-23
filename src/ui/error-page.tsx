import { Variant, VariantContext } from "@/context/variant.context";
import { BugIcon, LoaderIcon } from "@/ui/icons";
import { Button, buttonVariants } from "@/ui/button";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { notifyImmediateEndOfGameAction, notifyScoreSharedAction } from "@/actions/pusher.actions";
import { useAuth } from "@/auth/authentication.context";
import QwixxStore from "@/state/store";
import { stateSelector } from "@/state/selectors";
import { useGamePin } from "@/utils/use-game-pin.hook";
import { useState } from "react";

interface ComponentProps {
  variant: Variant;
  totalScore: number;
  reset: () => void
}

export const UnExpectedError = ({variant, totalScore, reset}: ComponentProps) => {
  const [gameEnded, setGameEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const {nickname} = useAuth();
  const store = QwixxStore(stateSelector);
  const pin = useGamePin();
  const undo = QwixxStore.use.undo();

  const handleUndp = () => {
    undo();
    reset();
  }

  const handleEndGame = async () => {
    setLoading(true);
    await Promise.all([
      notifyImmediateEndOfGameAction(variant, pin),
      notifyScoreSharedAction(variant, pin, store, totalScore, nickname as string),
    ])
    setLoading(false);
    setGameEnded(true);
  }

  let content = <>
    <Button variant="default" className="w-full" onClick={handleUndp}>Undo last action</Button>
    <Button variant="ghost" className="w-full" onClick={handleEndGame}>End the game</Button>
  </>;

  if (loading) {
    content = <LoaderIcon className="h-10 w-10 mx-auto animate-spin"/>
  }

  if (gameEnded) {
    content = <>
      <Link href="/create" className={cn(buttonVariants({variant: "default"}), "w-full")}>Create new game</Link>
      <Link href="/join-existing" className={cn(buttonVariants({variant: "ghost"}), "w-full")}>Or join an existing
        game</Link>
    </>
  }

  return <VariantContext.Provider value={variant}>
    <main className="h-full w-full flex justify-center items-center p-4 bg-red-600">
      <div className="px-12 py-4 border rounded-xl bg-white space-y-2 m-3 text-center">
        <BugIcon className="h-16 w-16 mt-4 mx-auto rotate-12 opacity-30"/>
        <section className="pb-4 space-y-4">
          <h1 className="font-bold text-4xl">Unexpected Error</h1>
          <p className="max-w-96 leading-relaxed">It looks like you&lsquo;ve encountered an unexpected bug. You can try
            undoing your last action and choosing a different one, or you can choose to end the game.</p>
        </section>

        {content}
      </div>
    </main>
  </VariantContext.Provider>;
}
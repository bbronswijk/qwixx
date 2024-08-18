'use client';

import Image from 'next/image';
import React, { useState } from "react";
import BackButton from "@/ui/back-button";
import QwixxStore from "@/state/store";
import { useAuth } from "@/auth/authentication.context";
import { createGameAction } from "@/actions/game.actions";
import { Variant } from "@/context/variant.context";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle
} from "@/ui/alert-dialog";
import { DialogHeader } from "@/ui/dialog";
import { GamePadIcon } from "@/ui/icons";

type ComponentProps = {
  image: string;
  title: string;
  onClick: () => void;
}

export default function Home() {
  const {nickname} = useAuth()
  const reset = QwixxStore.use.reset();
  const [pin, setPin] = useState<number | null>(null)
  const [variant, setVariant] = useState<Variant | undefined>()

  const createGame = async (variant: Variant) => {
    setVariant(variant);

    const game = await createGameAction(variant, nickname as string);
    reset();

    setPin(game.pin);
  }

  return (
    <main className="min-h-full bg-slate-100">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
      </header>

      <h1 className="text-2xl col-span-2 font-bold text-center pt-8">Choose a variant</h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 mx-auto w-fit">
        <GameCard onClick={() => createGame(Variant.DEFAULT)} image="/default.png" title="Standaard"/>
        <GameCard onClick={() => createGame(Variant.BONUS_A)} image="/variant-a.png" title="Bonus variant A"/>
        <GameCard onClick={() => createGame(Variant.BONUS_B)} image="/variant-b.png" title="Bonus variant B"/>
        <GameCard onClick={() => createGame(Variant.MIXED_A)} image="/mixed-a.png" title="Mix variant A"/>
      </section>

      <AlertDialog open={!!variant}>
        <GamePinDialog pin={pin} variant={variant}/>
      </AlertDialog>
    </main>
  );
}

const GameCard = ({onClick, image, title}: ComponentProps) => (
  <article className="border w-fit rounded-xl hover:shadow-xl duration-300 overflow-hidden bg-white"
           onClick={onClick}>
    <h1 className="text-slate-400 pt-6 text-center leading-none">Variant</h1>
    <h1 className="font-bold text-lg md:text-xl text-center">{title}</h1>
    <Image src={image} className="h-36 mb-4 flex items-center justify-center object-contain"
           alt={title} width={600} height={313} priority/>
  </article>
);

const GamePinDialog = ({pin, variant}: { pin: number | null; variant: Variant | undefined }) => {
  const router = useRouter();

  if (!pin) {
    return (
      <AlertDialogContent>
        <DialogHeader>
          <GamePadIcon className="h-20 w-20 mx-auto animate-bounce"/>
          <AlertDialogTitle className="text-center">Creating {variant} game</AlertDialogTitle>
          <AlertDialogDescription className="text-center">One moment please...</AlertDialogDescription>
        </DialogHeader>
      </AlertDialogContent>
    );
  }

  return (
    <AlertDialogContent>
      <DialogHeader>
        <AlertDialogTitle className="text-center">Game created!</AlertDialogTitle>
        <AlertDialogDescription className="text-center">Players can join your game with the pin
          below</AlertDialogDescription>
      </DialogHeader>
      <h1 className="font-bold text-8xl text-center">{pin}</h1>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => router.push(`/${pin}/${variant}`)}>
          Start game
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}

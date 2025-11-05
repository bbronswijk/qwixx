"use client";

import Image from "next/image";
import React, { useState } from "react";
import BackButton from "@/ui/back-button";
import { useAuth } from "@/auth/authentication.context";
import { createGameAction } from "@/actions/game.actions";
import { Variant } from "@/context/variant.context";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle } from "@/ui/alert-dialog";
import { DialogHeader } from "@/ui/dialog";
import { GamePadIcon } from "@/ui/icons";
import type { Viewport } from "next";
import { Trophy } from "lucide-react";

type ComponentProps = {
  image: string;
  title: string;
  beta?: boolean;
  onClick: () => void;
};

export const viewport: Viewport = {
  themeColor: "black",
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
};

export default function Home() {
  const { nickname } = useAuth();
  const [pin, setPin] = useState<number | null>(null);
  const [variant, setVariant] = useState<Variant | undefined>();

  const createGame = async (variant: Variant) => {
    setVariant(variant);

    const game = await createGameAction(variant, nickname as string);

    setPin(game.pin);
  };

  return (
    <main className='min-h-full bg-slate-100'>
      <header className='fixed left-3 right-3 top-3 flex items-center justify-between gap-3'>
        <BackButton />
      </header>

      <h1 className='col-span-2 pt-8 text-center text-2xl font-bold'>Choose a game</h1>

      <section className='mx-auto grid w-fit grid-cols-1 gap-8 p-8 md:grid-cols-2'>
        <GameCard onClick={() => createGame(Variant.DEFAULT)} image='/default.png' title='Default' />
        <GameCard onClick={() => createGame(Variant.CONNECTED)} image='/connected.png' title='Connected' beta />
        <GameCard onClick={() => createGame(Variant.BONUS_A)} image='/variant-a.png' title='Bonus variant A' />
        <GameCard onClick={() => createGame(Variant.BONUS_B)} image='/variant-b.png' title='Bonus variant B' />
        <GameCard onClick={() => createGame(Variant.STEPS)} image='/steps.png' title='Steps' />
        <GameCard onClick={() => createGame(Variant.MIXED_A)} image='/mixed-a.png' title='Mix variant A' />
      </section>

      <AlertDialog open={!!variant}>
        <GamePinDialog pin={pin} variant={variant} />
      </AlertDialog>
    </main>
  );
}

const GameCard = ({ onClick, image, title, beta }: ComponentProps) => (
  <article className='relative w-fit overflow-hidden rounded-xl border bg-white text-center duration-300 hover:shadow-xl' onClick={onClick}>
    {beta && (
      <span className='absolute right-2 top-2 mx-auto flex items-center gap-2 rounded-full bg-blue-600 px-3 py-1.5 text-sm leading-none text-white'>
        <Trophy className='h-4 w-4' />
        New
      </span>
    )}
    <h1 className='pt-6 text-center leading-none text-slate-400'>Game</h1>
    <h1 className='flex items-center justify-center text-center text-lg font-bold md:text-xl'>{title}</h1>
    <Image src={image} className='mb-4 flex h-36 items-center justify-center object-contain' alt={title} width={600} height={313} priority />
  </article>
);

const GamePinDialog = ({ pin, variant }: { pin: number | null; variant: Variant | undefined }) => {
  const router = useRouter();

  if (!pin) {
    return (
      <AlertDialogContent>
        <DialogHeader>
          <GamePadIcon className='mx-auto h-20 w-20 animate-bounce' />
          <AlertDialogTitle className='text-center'>Creating {variant} game</AlertDialogTitle>
          <AlertDialogDescription className='text-center'>One moment please...</AlertDialogDescription>
        </DialogHeader>
      </AlertDialogContent>
    );
  }

  return (
    <AlertDialogContent>
      <DialogHeader>
        <AlertDialogTitle className='text-center'>Game created!</AlertDialogTitle>
        <AlertDialogDescription className='text-center'>Players can join your game with the pin below</AlertDialogDescription>
      </DialogHeader>
      <h1 className='text-center text-8xl font-bold'>{pin}</h1>
      <AlertDialogFooter>
        <AlertDialogAction onClick={() => router.push(`/${pin}/${variant}`)}>Start game</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
};

"use client";

import { Variant } from "@/context/variant.context";
import React, { useState } from "react";
import { AlertDialog } from "@/ui/alert-dialog";
import { createGameAction, GameStats } from "@/actions/game.actions";
import { useAuth } from "@/auth/authentication.context";
import { Carousel, CarouselContent } from "@/ui/carousel";
import { GamePinDialog } from "@/app/create/GamePinDialog";
import { GameCard } from "@/app/create/GameCard";

type Props = {
  gameStats: GameStats[];
};

const findStatsByVariant = (gameStats: GameStats[], variant: Variant) => gameStats.find((stats) => stats.variant === variant);

export function Games({ gameStats }: Props) {
  const { nickname } = useAuth();
  const [pin, setPin] = useState<number | null>(null);
  const [variant, setVariant] = useState<Variant | undefined>();

  const createGame = async (variant: Variant) => {
    setVariant(variant);

    const game = await createGameAction(variant, nickname as string);

    setPin(game.pin);
  };

  const onDialogOpenChange = (open: boolean) => {
    if (!open) {
      // reset local dialog state when dialog is closed
      setVariant(undefined);
      setPin(null);
    }
  };

  return (
    <>
      <Carousel className='w-full flex-1' opts={{ loop: true }}>
        <CarouselContent>
          <GameCard onClick={() => createGame(Variant.DEFAULT)} image='/default.png' title='Default' stats={findStatsByVariant(gameStats, Variant.DEFAULT)} />
          <GameCard onClick={() => createGame(Variant.CONNECTED)} image='/connected.png' title='Connected' beta stats={findStatsByVariant(gameStats, Variant.CONNECTED)} />
          <GameCard onClick={() => createGame(Variant.BONUS_A)} image='/variant-a.png' title='Bonus variant A' stats={findStatsByVariant(gameStats, Variant.BONUS_A)} />
          <GameCard onClick={() => createGame(Variant.BONUS_B)} image='/variant-b.png' title='Bonus variant B' stats={findStatsByVariant(gameStats, Variant.BONUS_B)} />
          <GameCard onClick={() => createGame(Variant.STEPS)} image='/steps.png' title='Steps' stats={findStatsByVariant(gameStats, Variant.STEPS)} />
          <GameCard onClick={() => createGame(Variant.MIXED_A)} image='/mixed-a.png' title='Mix variant A' stats={findStatsByVariant(gameStats, Variant.MIXED_A)} />
        </CarouselContent>
      </Carousel>

      <AlertDialog open={!!variant} onOpenChange={onDialogOpenChange}>
        <GamePinDialog pin={pin} variant={variant} />
      </AlertDialog>
    </>
  );
}

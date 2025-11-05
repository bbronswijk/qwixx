"use client";

import Row from "@/ui/row";
import React from "react";
import Failed from "@/ui/failed";
import { rows } from "@/data/color";
import { TotalScore } from "@/ui/totalScore";
import { useVariant, Variant } from "@/context/variant.context";
import { useConfiguration } from "@/context/configuration.context";
import Bonus from "@/app/[gameId]/[variant]/bonus-a/bonus";
import ExtraPoints from "@/app/[gameId]/[variant]/bonus-b/extra-points";
import { SelectedBlackTiles } from "@/app/[gameId]/[variant]/steps/SelectedBlackTiles";

export default function Board() {
  const config = useConfiguration();

  return (
    <div className='m-3 space-y-0.5 rounded-xl bg-slate-200 px-8 py-4 lg:p-8'>
      <Row row={rows.a} tiles={config.a} />
      <Row row={rows.b} tiles={config.b} />
      <Row row={rows.c} tiles={config.c} />
      <Row row={rows.d} tiles={config.d} />

      <BoardGameOptions />

      <footer className='flex items-center gap-2 py-0 pt-2 lg:gap-4 lg:py-2'>
        <Failed />
        <TotalScore />
      </footer>
    </div>
  );
}

export function BoardGameOptions() {
  const variant = useVariant();

  switch (variant) {
    case Variant.BONUS_A:
      return <Bonus />;
    case Variant.BONUS_B:
      return <ExtraPoints />;
    case Variant.STEPS:
      return <SelectedBlackTiles />;
    default:
      return null;
  }
}

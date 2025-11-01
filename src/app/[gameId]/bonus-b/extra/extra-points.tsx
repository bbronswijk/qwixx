"use client";

import React from "react";
import CheckTwoInLowestRow from "@/app/[gameId]/bonus-b/extra/check-two-in-lowest-row";
import CheckOneInAllRows from "@/app/[gameId]/bonus-b/extra/check-one-all-rows";
import LowestRowTimesTwo from "@/app/[gameId]/bonus-b/extra/lowest-row-times-two";
import FailedRoundsDontCount from "@/app/[gameId]/bonus-b/extra/failed-rounds-dont-count";
import PlusThirteen from "@/app/[gameId]/bonus-b/extra/plus-thirteen";
import { useChanges } from "@/state/store";
import { tileType } from "@/data/tile.model";
import { hasMetRequirements } from "@/utils/has-met-requirements";

export default function ExtraPoints() {
  const changes = useChanges();

  return (
    <div data-testid='bonus' className='flex items-center justify-between rounded-lg border-2 border-slate-400 p-2 lg:p-3'>
      <CheckTwoInLowestRow checked={hasMetRequirements(changes, tileType.checkTwoInLowestRow)} />
      <CheckOneInAllRows checked={hasMetRequirements(changes, tileType.checkOneInAllRows)} />
      <LowestRowTimesTwo checked={hasMetRequirements(changes, tileType.lowestRowTimesTwo)} />
      <PlusThirteen checked={hasMetRequirements(changes, tileType.plusThirteen)} />
      <FailedRoundsDontCount checked={hasMetRequirements(changes, tileType.failedRoundsDontCount)} />
    </div>
  );
}

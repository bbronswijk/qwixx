'use client';

import React from 'react';
import CheckTwoInLowestRow from '@/app/variant-b/extra/check-two-in-lowest-row';
import CheckOneInAllRows from '@/app/variant-b/extra/check-one-all-rows';
import LowestRowTimesTwo from '@/app/variant-b/extra/lowest-row-times-two';
import FailedRoundsDontCount from '@/app/variant-b/extra/failed-rounds-dont-count';
import PlusThirteen from '@/app/variant-b/extra/plus-thirteen';
import QwixxStore, { Change } from '@/state/store';
import { tileType, TileType } from '@/data/tile.model';

export const hasMetRequirements = (changes: Change[], type: TileType) => changes.filter((change) => 'type' in change && change.type === type).length === 2;

export default function ExtraPoints() {
  const changes = QwixxStore.use.changes();

  return (
    <div data-testid="bonus"
         className="flex justify-between border-2 border-slate-400 rounded-lg items-center p-2 lg:p-3">
      <CheckTwoInLowestRow checked={hasMetRequirements(changes, tileType.checkTwoInLowestRow)}/>
      <CheckOneInAllRows checked={hasMetRequirements(changes, tileType.checkOneInAllRows)}/>
      <LowestRowTimesTwo checked={hasMetRequirements(changes, tileType.lowestRowTimesTwo)}/>
      <PlusThirteen checked={hasMetRequirements(changes, tileType.plusThirteen)}/>
      <FailedRoundsDontCount checked={hasMetRequirements(changes, tileType.failedRoundsDontCount)}/>
    </div>
  );
}

"use client";

import BonusBox from "@/app/[gameId]/[variant]/bonus-a/bonus-box";
import { TriangleIcon } from "@/ui/icons";
import React, { Fragment } from "react";
import { bonusBoxes } from "@/app/[gameId]/[variant]/bonus-a/variant-a.config";
import { useBonus } from "@/state/store";

export default function Bonus() {
  const bonus = useBonus();
  const selected = bonus.map(({ id }) => id);

  return (
    <div data-testid='bonus' className='flex items-center rounded-lg border-slate-400 py-2 lg:py-4'>
      {bonusBoxes.map((item, index) => (
        <Fragment key={item.id}>
          <BonusBox checked={selected.includes(item.id)} className={item.className} />
          {index < bonusBoxes.length - 1 && <TriangleIcon className='mx-0.5 h-4 w-4 text-black' />}
        </Fragment>
      ))}
    </div>
  );
}

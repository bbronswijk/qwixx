import QwixxStore from "@/state/store";
import { cn } from "@/utils/cn";
import React from "react";
import { useTotalScore } from "@/context/total-score.context";

export const TotalScore = () => {
  const showScore = QwixxStore.use.showScore();
  const totalScore = useTotalScore();

  return (
    <div className={cn("ml-auto flex h-8 items-center justify-center rounded-lg bg-white/70 px-2 font-bold lg:h-12 lg:px-4", !showScore && "opacity-0")}>
      <span className='ml-auto text-lg font-bold text-slate-400 lg:text-xl'>Total</span>
      <span data-testid='score' className='w-12 text-right text-xl text-black lg:w-16 lg:text-4xl'>
        {totalScore}
      </span>
    </div>
  );
};

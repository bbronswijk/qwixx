import QwixxStore from "@/state/store";
import { cn } from "@/utils/cn";
import React from "react";

interface ComponentProps {
  totalScore: number;
}

export const TotalScore = ({totalScore}: ComponentProps) => {
  const showScore = QwixxStore.use.showScore();

  return (
    <div
      className={cn("bg-white/70 rounded-lg px-2 lg:px-4 font-bold h-8 lg:h-12 flex items-center justify-center ml-auto", !showScore && 'opacity-0')}>
      <span className="text-slate-400 ml-auto font-bold text-lg lg:text-xl">Total</span>
      <span data-testid="score"
            className="text-black w-12 lg:w-16 text-right text-xl lg:text-4xl">
          {totalScore}
        </span>
    </div>
  )
}
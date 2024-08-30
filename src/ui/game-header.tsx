import { GamePin } from "@/ui/game-pin";
import UndoButton from "@/ui/undo-button";
import ToggleScoreButton from "@/ui/toggle-score-button";
import React from "react";
import { LeaveGameButton } from "@/ui/leave-game-button";

export const GameHeader = () => (
  <header className='fixed left-3 right-3 top-3 flex items-center justify-between gap-3'>
    <LeaveGameButton />
    <GamePin />
    <UndoButton />
    <ToggleScoreButton />
  </header>
);

import { GamePin } from "@/ui/game-pin";
import UndoButton from "@/ui/undo-button";
import ToggleScoreButton from "@/ui/toggle-score-button";
import React from "react";
import { LeaveGameButton } from "@/ui/leave-game-button";

export const GameHeader = () => (
  <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
    <LeaveGameButton/>
    <GamePin/>
    <UndoButton/>
    <ToggleScoreButton/>
  </header>
)
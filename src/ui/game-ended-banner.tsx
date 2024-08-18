import { notifyScoreSharedAction } from "@/actions/pusher.actions";
import QwixxStore from "@/state/store";
import { useGamePin } from "@/utils/use-game-pin.hook";
import { useAuth } from "@/auth/authentication.context";
import { useVariant } from "@/context/variant.context";
import { Dialog } from "@/ui/dialog";
import { GameScoresDialogContent } from "@/ui/game-scores-dialog-content";
import React, { useEffect, useState } from "react";
import { stateSelector } from "@/state/selectors";
import { Button } from "@/ui/button";

export const GameEndedBanner = ({totalScore}: { totalScore: number }) => {
  const pin = useGamePin();
  const {nickname} = useAuth()
  const variant = useVariant();
  const store = QwixxStore(stateSelector);
  const gameCompleted = QwixxStore.use.gameCompleted();
  const [showScoreDialog, setShowScoreDialog] = useState(false)


  useEffect(() => {
    if (gameCompleted) {
      notifyScoreSharedAction(variant, pin, store, totalScore, nickname as string);
      setShowScoreDialog(true);
    }
  }, [gameCompleted]);

  return (
    <>
      {gameCompleted && <div onClick={() => setShowScoreDialog(true)}
                             className="fixed bg-red-500 text-white py-2 px-10 bottom-0 left-0 w-full font-medium flex justify-between items-center">
          This game has ended!
          <Button variant="ghost" className="ml-4 border border-white">Show results</Button>
      </div>}
      <Dialog open={showScoreDialog} onOpenChange={setShowScoreDialog}>
        <GameScoresDialogContent/>
      </Dialog>
    </>
  )
}
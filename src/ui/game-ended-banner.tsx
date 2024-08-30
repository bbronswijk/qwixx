import { notifyScoreSharedAction } from "@/actions/pusher.actions";
import QwixxStore from "@/state/store";
import { useGamePin } from "@/utils/use-game-pin.hook";
import { useAuth } from "@/auth/authentication.context";
import { useVariant } from "@/context/variant.context";
import { Dialog } from "@/ui/dialog";
import { GameScoresDialogContent } from "@/ui/game-scores-dialog-content";
import React, { useEffect, useState } from "react";
import { stateSelector, usersCompleted2RowsSelector } from "@/state/selectors";
import { Button } from "@/ui/button";

export const GameEndedBanner = ({ totalScore }: { totalScore: number }) => {
  const pin = useGamePin();
  const { nickname } = useAuth();
  const variant = useVariant();
  const store = QwixxStore(stateSelector);
  const gameCompleted = QwixxStore.use.gameCompleted();
  const userCompleted2Rows = QwixxStore(usersCompleted2RowsSelector);
  const markAsGameCompleted = QwixxStore.use.markAsGameCompleted();
  const [showScoreDialog, setShowScoreDialog] = useState(false);

  useEffect(() => {
    if (userCompleted2Rows) {
      markAsGameCompleted();
    }
  }, [markAsGameCompleted, userCompleted2Rows]);

  useEffect(() => {
    if (gameCompleted) {
      notifyScoreSharedAction(variant, pin, store, totalScore, nickname as string);
      setShowScoreDialog(true);
    }
  }, [gameCompleted]);

  return (
    <>
      {gameCompleted && (
        <div onClick={() => setShowScoreDialog(true)} className='fixed bottom-0 left-0 flex w-full items-center justify-between bg-red-500 px-10 py-2 font-medium text-white'>
          This game has ended!
          <Button variant='ghost' className='ml-4 border border-white'>
            Show results
          </Button>
        </div>
      )}
      <Dialog open={showScoreDialog} onOpenChange={setShowScoreDialog}>
        <GameScoresDialogContent />
      </Dialog>
    </>
  );
};

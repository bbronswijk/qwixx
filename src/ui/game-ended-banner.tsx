import { notifyScoreSavedAction, notifyUserEndedGameAction } from "@/actions/pusher.actions";
import QwixxStore from "@/state/store";
import { useGamePin } from "@/utils/use-game-pin.hook";
import { useAuth } from "@/auth/authentication.context";
import { useVariant } from "@/context/variant.context";
import { Dialog } from "@/ui/dialog";
import { GameScoresDialogContent } from "@/ui/game-scores-dialog-content";
import React, { useEffect, useState } from "react";
import { stateSelector, usersCompleted2RowsSelector } from "@/state/selectors";
import { Button } from "@/ui/button";
import { useTotalScore } from "@/context/total-score.context";

export const GameEndedBanner = () => {
  const pin = useGamePin();
  const { nickname } = useAuth();
  const variant = useVariant();
  const state = QwixxStore(stateSelector);
  const gameCompleted = QwixxStore.use.gameCompleted();
  const otherUserCompletedGame = QwixxStore.use.otherUserCompletedGame();
  const userCompleted2Rows = QwixxStore(usersCompleted2RowsSelector);
  const markAsGameCompleted = QwixxStore.use.markAsGameCompleted();
  const [showScoreDialog, setShowScoreDialog] = useState(false);
  const totalScore = useTotalScore();
  const failedRounds = QwixxStore.use.failed();

  useEffect(() => {
    if (failedRounds >= 4 || userCompleted2Rows) {
      // Save score to the db
      // Notify other user that this user has completed 2 rows
      notifyUserEndedGameAction(variant, pin, state, totalScore, nickname);
      markAsGameCompleted();
      setShowScoreDialog(true);
    }
  }, [userCompleted2Rows, failedRounds]);

  useEffect(() => {
    if (otherUserCompletedGame) {
      // Save score silently to the db
      notifyScoreSavedAction(variant, pin, state, totalScore, nickname);
    }
  }, [otherUserCompletedGame]);

  const onShowScoreDialog = () => {
    // Save score to the db and notify other user
    notifyScoreSavedAction(variant, pin, state, totalScore, nickname);
    setShowScoreDialog(true);
  };

  return (
    <>
      {(gameCompleted || otherUserCompletedGame) && (
        <div onClick={onShowScoreDialog} className='fixed bottom-0 left-0 flex w-full items-center justify-between bg-red-500 px-10 py-2 font-medium text-white'>
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

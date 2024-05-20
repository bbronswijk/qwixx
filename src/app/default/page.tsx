'use client';

import Board from '@/ui/board';
import React, { useEffect } from 'react';
import { defaultTiles } from '@/app/default/default.config';
import { useTotalSelector } from '@/state/selectors';
import QwixxStore from '@/state/store';
import BackButton from '@/ui/back-button';
import UndoButton from '@/ui/undo-button';
import ToggleScoreButton from '@/ui/toggle-score-button';

export default function Home() {
  const userActions = QwixxStore.use.changes();
  const lockedState = QwixxStore.use.locked();
  const reset = QwixxStore.use.reset();
  const undo = QwixxStore.use.undo();
  const failedRounds = QwixxStore.use.failed();
  const onFailRound = QwixxStore.use.roundFailed();
  const onCheckTile = QwixxStore.use.checkTile();
  const toggleRowLocked = QwixxStore.use.toggleRowLocked();
  const showScore = QwixxStore.use.showScore();
  const toggleScoreVisibility = QwixxStore.use.toggleScoreVisibility();
  const selected = QwixxStore();

  useEffect(() => {
    reset();
  }, []);

  return (
    <main className="h-full w-full flex justify-center items-center">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
        <UndoButton disabled={userActions.length === 0} onClick={undo}/>
        <ToggleScoreButton visible={showScore} onClick={toggleScoreVisibility}/>
      </header>
      <Board
        state={selected}
        lockedState={lockedState}
        onCheckTile={onCheckTile}
        config={defaultTiles}
        showScore={showScore}
        hasMadeChanges={userActions.length > 0}
        failedRounds={failedRounds}
        onFailRound={onFailRound}
        undoClicked={() => undo()}
        onLockedIconClicked={toggleRowLocked}
        totalScore={useTotalSelector(defaultTiles)}>
      </Board>
    </main>
  );
}

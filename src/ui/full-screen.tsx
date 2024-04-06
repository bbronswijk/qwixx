'use client';

import React, { useState } from 'react';
import { ExitFullScreenIcon, FullScreenIcon } from '@/ui/icons';

export default function FullScreen() {
  const [fullScreen, setFullScreen] = useState(false);

  const requestFullScreen = async () => {
    if (document.documentElement.requestFullscreen) {
      setFullScreen(true);
      await document.documentElement.requestFullscreen();
    }
  };

  const exitFullScreen = async () => {
    if (document.exitFullscreen) {
      setFullScreen(false);
      await document.exitFullscreen();
    }
  };

  return (
    fullScreen
      ? <button className="fixed right-2 bottom-2" onClick={() => exitFullScreen()}>
        <ExitFullScreenIcon/>
      </button>
      : <button className="fixed right-2 bottom-2" onClick={() => requestFullScreen()}>
        <FullScreenIcon/>
      </button>
  );
}
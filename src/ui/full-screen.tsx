'use client';

import React from 'react';
import { FullScreenIcon } from '@/ui/icons';

export default function FullScreen() {

  const requestFullScreen = async () => {
    if (document.documentElement.requestFullscreen) {
      await document.documentElement.requestFullscreen();
    }
  };

  return (
    <button className="fixed right-2 bottom-2" onClick={() => requestFullScreen()}>
      <FullScreenIcon/>
    </button>
  );
}
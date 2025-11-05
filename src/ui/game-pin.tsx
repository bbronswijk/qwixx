import React from "react";

import { useGamePin } from "@/context/game-pin.context";

export const GamePin = () => {
  const pin = useGamePin();

  return (
    <span className='mr-auto flex items-center justify-center gap-1 rounded-lg'>
      <b>Pin {pin}</b>
    </span>
  );
};

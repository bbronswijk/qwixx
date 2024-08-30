import React from "react";
import { useGamePin } from "@/utils/use-game-pin.hook";

export const GamePin = () => {
  const pin = useGamePin();

  return (
    <span className='mr-auto flex items-center justify-center gap-1 rounded-lg'>
      <b>Pin {pin}</b>
    </span>
  );
};

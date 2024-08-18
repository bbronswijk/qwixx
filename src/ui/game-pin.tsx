import React from "react";
import { useGamePin } from "@/utils/use-game-pin.hook";

export const GamePin = () => {
  const pin = useGamePin()

  return (
    <span className="flex items-center justify-center rounded-lg gap-1 mr-auto">
      <b>Pin {pin}</b>
    </span>
  );
}
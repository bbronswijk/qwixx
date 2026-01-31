"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "~/utils/cn";
import { Dices, X } from "lucide-react";

type DiceColor = "white" | "red" | "yellow" | "green" | "blue";

interface DiceProps {
  value: number;
  color: DiceColor;
  isRolling: boolean;
}

const diceColors: Record<DiceColor, { bg: string; dots: string }> = {
  white: { bg: "bg-white border-2 border-neutral-00", dots: "bg-neutral-800" },
  red: { bg: "bg-red-800", dots: "bg-white" },
  yellow: { bg: "bg-yellow-500", dots: "bg-white" },
  green: { bg: "bg-green-700", dots: "bg-white" },
  blue: { bg: "bg-blue-800", dots: "bg-white" },
};

function Dice({ value, color, isRolling }: DiceProps) {
  const { bg, dots } = diceColors[color];

  const dotPositions: Record<number, string[]> = {
    1: ["center"],
    2: ["top-right", "bottom-left"],
    3: ["top-right", "center", "bottom-left"],
    4: ["top-left", "top-right", "bottom-left", "bottom-right"],
    5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
    6: ["top-left", "top-right", "middle-left", "middle-right", "bottom-left", "bottom-right"],
  };

  const positionClasses: Record<string, string> = {
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "middle-left": "top-1/2 left-2 -translate-y-1/2",
    "middle-right": "top-1/2 right-2 -translate-y-1/2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2",
  };

  return (
    <div className={cn("relative h-12 w-12 rounded-lg", bg, isRolling && "animate-spin blur-[2px] duration-200")}>
      {dotPositions[value]?.map((position, index) => <div key={index} className={cn("absolute h-2 w-2 rounded-full", dots, positionClasses[position])} />)}
    </div>
  );
}

const diceOrder: DiceColor[] = ["white", "white", "red", "yellow", "green", "blue"];

export function DiceToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [diceValues, setDiceValues] = useState<number[]>([1, 1, 1, 1, 1, 1]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = useCallback(() => {
    setIsRolling(true);
    setDiceValues(diceOrder.map(() => 6));

    setTimeout(() => {
      setDiceValues(diceOrder.map(() => Math.floor(Math.random() * 6) + 1));
      setIsRolling(false);
    }, 500);
  }, []);

  // Roll dice when opening
  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      rollDice();
    }
  }, [isOpen, rollDice]);

  return (
    <>
      <button type='button' onClick={() => setIsOpen((v) => !v)} className='fixed bottom-3 right-3 flex items-center justify-center rounded-lg bg-slate-200 p-1.5'>
        {isOpen ? <X /> : <Dices />}
      </button>

      <div
        className={cn(
          "slide-in-up fixed bottom-2 left-[calc(50%_-_250px)] z-10 flex w-[500px] items-center justify-center gap-3 overflow-hidden rounded-lg border border-border bg-card p-2 shadow-xl fill-mode-forwards",
          isOpen ? "animate-slide-in-up" : "animate-slide-out-down"
        )}
      >
        {diceOrder.map((color, index) => (
          <Dice key={index} value={diceValues[index]} color={color} isRolling={isRolling} />
        ))}
      </div>
    </>
  );
}

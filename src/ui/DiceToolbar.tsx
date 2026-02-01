/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import { Dices, X } from "lucide-react";
import { notifyUserRolledDices } from "~/actions/pusher.actions";
import { useVariant } from "~/context/variant.context";
import { useAuth } from "~/auth/authentication.context";
import { useGamePin } from "~/context/game-pin.context";
import { pusherClient } from "~/pusher/pusher.client";
import { Dice, DiceColor } from "~/ui/Dice";
import { useActions } from "~/state/store";

const diceOrder: DiceColor[] = ["white", "white", "red", "yellow", "green", "blue"];

export function DiceToolbar() {
  const variant = useVariant();
  const { nickname } = useAuth();
  const pin = useGamePin();
  const [isOpen, setIsOpen] = useState(false);
  const [diceValues, setDiceValues] = useState<number[]>([1, 1, 1, 1, 1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const { setDiceNotificationOpen } = useActions();

  const rollDice = useCallback(async () => {
    const result = diceOrder.map(() => Math.floor(Math.random() * 6) + 1);
    setIsRolling(true);
    await notifyUserRolledDices(variant, pin, nickname, [result[0], result[1]], pusherClient.connection.socket_id);
    setDiceValues(result);

    setTimeout(async () => setIsRolling(false), 500);
  }, [variant, pin, nickname]);

  // Roll dice when opening
  useEffect(() => {
    if (isOpen) {
      rollDice();
    }
  }, [isOpen, rollDice]);

  return (
    <>
      <button
        type='button'
        onClick={() => {
          setIsOpen((v) => !v);

          if (!isOpen) {
            setDiceNotificationOpen(false);
          }
        }}
        className='fixed bottom-3 right-3 flex items-center justify-center rounded-lg bg-slate-200 p-1.5'
      >
        {isOpen ? <X /> : <Dices />}
      </button>

      <div
        className={cn(
          "fixed bottom-2 left-[calc(50%_-_250px)] z-10 flex w-[500px] items-center justify-center gap-3 overflow-hidden rounded-lg border border-border bg-card p-2 shadow-xl fill-mode-forwards",
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

/* eslint-disable react-hooks/set-state-in-effect */
import { useCallback, useEffect, useState } from "react";
import { usePusher } from "~/pusher/pusher.context";
import { cn } from "~/utils/cn";
import { MemberAvatar } from "~/ui/MemberAvatar";
import { Dice } from "~/ui/Dice";
import { X } from "lucide-react";
import { useActions, useDiceNotificationOpen } from "~/state/store";

export function DiceThrownByOtherUser() {
  const diceNotificationOpen = useDiceNotificationOpen();
  const { setDiceNotificationOpen } = useActions();
  const [isRolling, setIsRolling] = useState(false);
  const { rolledDice } = usePusher();

  const rollDice = useCallback(() => {
    setIsRolling(true);

    setTimeout(() => {
      setIsRolling(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (rolledDice?.dices) {
      setDiceNotificationOpen(true);
      rollDice();
    }
  }, [rolledDice?.dices]);

  if (!rolledDice) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed left-[calc(50%_-_150px)] top-2 z-10 flex w-[300px] items-center justify-between gap-3 overflow-hidden rounded-lg border border-border bg-card py-2 pl-6 pr-4 shadow-xl fill-mode-forwards",
        diceNotificationOpen ? "animate-slide-in-down" : "animate-slide-out-up"
      )}
    >
      <MemberAvatar className='relative mr-4 h-10 w-10' height={48} width={48} nickName={rolledDice.nickname} />

      <div className='flex gap-3'>
        <Dice value={rolledDice.dices[0]} color='white' isRolling={isRolling} />
        <Dice value={rolledDice.dices[1]} color='white' isRolling={isRolling} />
      </div>

      <button type='button' onClick={() => setDiceNotificationOpen(false)} className='ml-4 flex items-center justify-center rounded-lg p-2'>
        <X />
      </button>
    </div>
  );
}

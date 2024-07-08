'use client';

import { usePusher } from "@/pusher/pusher.context";
import { DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import QwixxStore from "@/state/store";

export const GameOverDialogContent = () => {
  const {members} = usePusher();
  const router = useRouter();
  const reset = QwixxStore.use.reset();

  return (
    <DialogContent>
      <h1 className="text-3xl font-bold text-center">Game over 🏆</h1>
      {members
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .map((member) => (
          <div key={member.nickname} className="flex items-center gap-4 font-bold text-xl ">
            <Image src={`https://avatar.iran.liara.run/username?username=${member.nickname}`}
                   alt={member.nickname}
                   height={40} width={40}/>
            <span>{member.nickname}</span>
            {member.score !== undefined
              ? <span className="ml-auto">{member.score} punten</span>
              : <span className="ml-auto">loading...</span>
            }
          </div>
        ))}
      <Button onClick={() => {
        router.back();
        reset();
      }} className="w-full" type="submit">Finish game</Button>
    </DialogContent>
  );
}
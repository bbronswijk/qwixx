"use client";

import { DialogContent, DialogFooter } from "@/ui/dialog";
import Image from "next/image";
import React from "react";
import QwixxStore from "@/state/store";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/ui/button";

export const GameScoresDialogContent = () => {
  const scores = QwixxStore.use.scores();

  return (
    <DialogContent>
      <h1 className='text-center text-3xl font-bold'>Game over 🏆</h1>
      {scores
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .map((member) => (
          <div key={member.nickname} className='flex items-center gap-4 text-xl font-bold'>
            <Image src={`https://avatar.iran.liara.run/username?username=${member.nickname}`} alt={member.nickname} height={40} width={40} />
            <span>{member.nickname}</span>
            {member.score !== null ? <span className='ml-auto'>{member.score} punten</span> : <span className='ml-auto'>waiting...</span>}
          </div>
        ))}
      <DialogFooter>
        <Link href='/create' className={cn(buttonVariants({ variant: "default" }), "w-full")}>
          Create new game
        </Link>
        <Link href='/join-existing' className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
          Join new game
        </Link>
      </DialogFooter>
    </DialogContent>
  );
};

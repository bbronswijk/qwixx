"use client";

import { DialogContent, DialogFooter } from "@/ui/dialog";
import React from "react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { buttonVariants } from "@/ui/button";
import { useActions, useScores } from "@/state/store";
import { MemberAvatar } from "@/ui/MemberAvatar";

export const GameScoresDialogContent = () => {
  const scores = useScores();
  const { reset } = useActions();

  return (
    <DialogContent>
      <h1 className='text-center text-3xl font-bold'>Game over 🏆</h1>
      {scores
        .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
        .map((member) => (
          <div key={member.nickname} className='flex items-center gap-4 text-xl font-bold'>
            <MemberAvatar nickName={member.nickname} height={40} width={40} />
            <span>{member.nickname}</span>
            {member.score !== null ? <span className='ml-auto'>{member.score} punten</span> : <span className='ml-auto'>waiting...</span>}
          </div>
        ))}
      <DialogFooter>
        <Link onClick={() => reset()} href='/create' className={cn(buttonVariants({ variant: "default" }), "w-full")}>
          Create new game
        </Link>
        <Link onClick={() => reset()} href='/join-existing' className={cn(buttonVariants({ variant: "outline" }), "w-full")}>
          Join new game
        </Link>
      </DialogFooter>
    </DialogContent>
  );
};

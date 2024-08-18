'use client';

import React from 'react';
import { useAuth } from "@/auth/authentication.context";
import { buttonVariants } from "@/ui/button";
import Image from "next/image";
import { ChevronLeftIcon } from "@/ui/icons";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Page() {
  const {nickname} = useAuth();
  const {logOut} = useAuth();

  return (
    <main className="h-full w-full flex flex-col justify-center items-center bg-slate-100 p-4">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <button className="flex items-center justify-center p-1.5 rounded-lg bg-slate-200"
                onClick={() => logOut()}>
          <ChevronLeftIcon/>
        </button>
      </header>

      <div className="border rounded-2xl p-8 bg-white max-w-96 w-full space-y-2">
        <Image src="/icons/256.png" height={100} width={100} alt="qwixx logo" className="mx-auto rounded-2xl"/>
        <h1 className="text-3xl font-bold text-center py-4">Welcome {nickname}!</h1>
        <Link href="/create" className={cn(buttonVariants({variant: "default"}), 'w-full')} type="submit">Create new
          game
        </Link>
        <Link href="/join-existing" className={cn(buttonVariants({variant: "outline"}), 'w-full')} type="submit">Or
          join an existing game
        </Link>
      </div>
    </main>
  );
}

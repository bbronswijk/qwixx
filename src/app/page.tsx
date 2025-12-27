"use client";

import React from "react";
import { useAuth } from "@/auth/authentication.context";
import { buttonVariants } from "@/ui/button";
import Image from "next/image";
import { ChevronLeftIcon } from "@/ui/icons";
import Link from "next/link";
import { cn } from "@/utils/cn";

export default function Page() {
  const { nickname } = useAuth();
  const { logOut } = useAuth();

  return (
    <main className='flex min-h-svh flex-col items-center justify-center bg-slate-100 p-4'>
      <header className='fixed left-3 right-3 top-3 flex items-center justify-between gap-3'>
        <button className='flex items-center justify-center rounded-lg bg-slate-200 p-1.5' onClick={() => logOut()}>
          <ChevronLeftIcon />
        </button>
      </header>

      <div className='w-full max-w-full space-y-2 rounded-2xl border bg-white p-8 sm:max-w-96'>
        <Image src='/icons/256.png' height={100} width={100} alt='qwixx logo' className='mx-auto rounded-2xl' />
        <h1 className='py-4 text-center text-3xl font-bold'>Welcome {nickname}!</h1>
        <Link href='/create' className={cn(buttonVariants({ variant: "default" }), "w-full")} type='submit'>
          Create new game
        </Link>
        <Link href='/join-existing' className={cn(buttonVariants({ variant: "outline" }), "w-full")} type='submit'>
          Or join an existing game
        </Link>
        <Link href='/history' className={cn(buttonVariants({ variant: "ghost" }), "w-full")} type='submit'>
          Game scores
        </Link>
      </div>
    </main>
  );
}

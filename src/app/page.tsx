'use client';

import React from 'react';
import { useAuth } from "@/auth/authentication.context";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeftIcon } from "@/ui/icons";

function generateGamePin(): number {
  return Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
}

export default function Page() {
  const {userName} = useAuth();
  const newGamePin = generateGamePin();
  const router = useRouter();
  const {logOut} = useAuth();

  return (
    <main className="h-full w-full flex flex-col justify-center items-center bg-slate-100">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <button className="flex items-center justify-center p-1.5 rounded-lg bg-slate-200"
                onClick={() => logOut()}>
          <ChevronLeftIcon/>
        </button>
      </header>

      <div className="border rounded-2xl p-8 bg-white w-96 space-y-2">
        <Image src="/icons/256.png" height={100} width={100} alt="qwixx logo" className="mx-auto rounded-2xl"/>
        <h1 className="text-3xl font-bold text-center py-4">Welcome {userName}!</h1>
        <Button onClick={() => router.push(`/${newGamePin}`)} className="w-full" type="submit">Create new
          game</Button>
        <Button variant="outline" onClick={() => router.push('/join-existing')} className="w-full" type="submit">Or
          join an existing game</Button>
      </div>
    </main>
  );
}

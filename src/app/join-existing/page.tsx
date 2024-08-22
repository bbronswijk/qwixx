'use client';

import React, { useEffect, useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/ui/input-otp';
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import BackButton from "@/ui/back-button";
import { joinGameAction } from "@/actions/game.actions";
import { useAuth } from "@/auth/authentication.context";
import { useToast } from "@/ui/use-toast";
import QwixxStore from "@/state/store";
import { GamePadIcon } from "@/ui/icons";

export default function Page() {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const {nickname} = useAuth()
  const {toast} = useToast()
  const reset = QwixxStore.use.reset();
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gamePin = ref.current?.value;

    if (!gamePin) {
      toast({title: 'Enter a game pin', variant: 'destructive'});
      return
    }

    if (gamePin.length !== 4) {
      toast({title: 'Enter a game pin of 4 numbers', variant: 'destructive'});
      return
    }
    setJoining(true);

    const response = await joinGameAction(Number(gamePin), nickname as string);

    if ('error' in response) {
      toast({
        title: response.error.title,
        description: response.error.description,
        variant: 'destructive'
      });
      setJoining(false);
      return;
    }

    reset();
    router.push(`/${response.pin}/${response.variant}`);
  }

  return (
    <main className="h-full w-full flex flex-col p-4 justify-center items-center bg-slate-100">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
      </header>
      <form onSubmit={handleSubmit} className="border rounded-2xl p-8 bg-white w-full max-w-96 space-y-6">
        <h1 className="text-2xl text-center">Join an existing game</h1>
        <div className="flex justify-center flex-wrap">
          <InputOTP ref={ref} maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0}/>
              <InputOTPSlot index={1}/>
              <InputOTPSlot index={2}/>
              <InputOTPSlot index={3}/>
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center w-full leading-loose">Enter game pin</div>
        </div>
        <Button className="w-full" type="submit" disabled={joining}>
          {joining ? <GamePadIcon className="h-7 w-7 animate-bounce"/> : 'Join other player'}
        </Button>
      </form>
    </main>
  );
}
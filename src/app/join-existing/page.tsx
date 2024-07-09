'use client';

import React, { useRef } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/ui/input-otp';
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import BackButton from "@/ui/back-button";

export default function Page() {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
    <main className="h-full w-full flex flex-col gap-6 justify-center items-center bg-slate-100">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
      </header>
      <form onSubmit={(e) => {
        e.preventDefault();
        router.push(`/${ref.current?.value}`)
      }} className="border rounded-2xl p-8 bg-white w-96 space-y-6">
        <h1 className="text-2xl text-center">Or join an existing game</h1>
        <div className="flex justify-center flex-wrap">
          <InputOTP ref={ref} className="" maxLength={4}>
            <InputOTPGroup>
              <InputOTPSlot index={0}/>
              <InputOTPSlot index={1}/>
              <InputOTPSlot index={2}/>
              <InputOTPSlot index={3}/>
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center w-full leading-loose">Enter game pin</div>
        </div>
        <Button className="w-full" type="submit">Join other player</Button>
      </form>
    </main>
  );
}
'use client';

import React, { useRef, useState } from 'react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useAuth } from "@/app/auth/authentication.context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

function generateGamePin(): number {
  return Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
}

// TODO just use regular routing (and a back button) for this.
export default function Page() {
  const [showJoinExisting, setShowJoinExisting] = useState(false);

  return (
    <main className="h-full w-full flex flex-col gap-6 justify-center items-center bg-slate-100">
      {showJoinExisting
        ? <JoinExisting/>
        : <NewGame onJoinExisting={() => setShowJoinExisting(true)}/>

      }
    </main>
  );
}

const NewGame = ({onJoinExisting}: { onJoinExisting: () => void }) => {
  const {userName} = useAuth();
  const newGamePin = generateGamePin();
  const router = useRouter();

  return (
    <div className="border rounded-2xl p-8 bg-white w-96 space-y-6">
      <Image src="/icons/256.png" height={100} width={100} alt="qwixx logo" className="mx-auto rounded-2xl"/>
      <h1 className="text-3xl font-bold text-center">Welcome {userName}!</h1>
      <Button onClick={() => router.push(`/${newGamePin}`)} className="w-full" type="submit">Create new
        game</Button>
      <Button variant="outline" onClick={onJoinExisting} className="w-full" type="submit">Or
        join an existing game</Button>
    </div>
  )
}

const JoinExisting = () => {
  const ref = useRef<HTMLInputElement>(null);
  const router = useRouter();

  return (
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
  )
}
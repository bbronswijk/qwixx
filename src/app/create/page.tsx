'use client';

import React from 'react';
import BackButton from '@/ui/back-button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

export default function Page() {

  return (
    <main className="h-full w-full flex justify-center items-center">
      <header className="fixed top-3 left-3 right-3 gap-3 flex items-center justify-between">
        <BackButton/>
      </header>

      <div className="space-y-2">
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0}/>
            <InputOTPSlot index={1}/>
            <InputOTPSlot index={2}/>
            <InputOTPSlot index={3}/>
          </InputOTPGroup>
        </InputOTP>
      </div>

    </main>
  );
}

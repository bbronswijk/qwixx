"use client";

import React from "react";
import { StarIcon, XIcon } from "@/ui/icons";

interface ComponentProps {
  checked: boolean;
}

export default function FailedRoundsDontCount({ checked }: ComponentProps) {
  return (
    <div className='flex items-center gap-1'>
      <div className='relative h-6 w-6 lg:h-10 lg:w-10'>
        <StarIcon className='absolute h-full w-full fill-white text-black' />
        {checked && <XIcon className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-slate-700' />}
      </div>
      =
      <div className='relative grid grid-cols-2 items-center justify-center gap-x-1 gap-y-0.5 rounded-sm bg-white px-1.5 py-1 shadow'>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='h-1 w-1 rounded-full bg-black' />
        ))}
        <XIcon className='absolute ml-0.5 mt-3 h-8 w-8 text-red-700' />
      </div>
    </div>
  );
}

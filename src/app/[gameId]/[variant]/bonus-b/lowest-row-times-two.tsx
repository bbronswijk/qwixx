"use client";

import React from "react";
import { SquareIcon, XIcon } from "@/ui/icons";

interface ComponentProps {
  checked: boolean;
}

export default function LowestRowTimesTwo({ checked }: ComponentProps) {
  return (
    <div className='flex items-center gap-1'>
      <div className='relative h-6 w-6 lg:h-10 lg:w-10'>
        <SquareIcon className='absolute h-full w-full fill-white text-black' />
        {checked && <XIcon className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-slate-700' />}
      </div>
      =<div className='flex rounded border-2 border-slate-400 bg-white px-1'>x2</div>
    </div>
  );
}

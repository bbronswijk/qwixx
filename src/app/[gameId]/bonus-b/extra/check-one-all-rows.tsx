"use client";

import React, { useEffect } from "react";
import { RotatedSquareIcon, XIcon } from "@/ui/icons";
import QwixxStore from "@/state/store";

interface ComponentProps {
  checked: boolean;
}

export default function CheckOneAllRows({ checked }: ComponentProps) {
  const checkOneInEachRow = QwixxStore.use.checkOneInEachRow();

  useEffect(() => {
    if (checked) {
      checkOneInEachRow();
    }
  }, [checked]);

  return (
    <div className='flex items-center gap-1'>
      <div className='relative h-6 w-6 lg:h-10 lg:w-10'>
        <RotatedSquareIcon className='absolute h-full w-full fill-white text-black' />
        {checked && <XIcon className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-slate-700' />}
      </div>
      =
      <div className='grid grid-cols-2 gap-1'>
        <div className='flex rounded border-2 border-red-800 bg-red-100'>
          <XIcon className='h-3 w-3 text-slate-700' />
        </div>
        <div className='flex rounded border-2 border-yellow-600 bg-yellow-100'>
          <XIcon className='h-3 w-3 text-slate-700' />
        </div>
        <div className='flex rounded border-2 border-green-700 bg-green-100'>
          <XIcon className='h-3 w-3 text-slate-700' />
        </div>
        <div className='flex rounded border-2 border-blue-800 bg-blue-100'>
          <XIcon className='h-3 w-3 text-slate-700' />
        </div>
      </div>
    </div>
  );
}

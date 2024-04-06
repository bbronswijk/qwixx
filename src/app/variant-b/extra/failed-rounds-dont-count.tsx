'use client';

import React from 'react';
import { StarIcon, XIcon } from '@/ui/icons';

interface ComponentProps {
  checked: boolean;
}

export default function FailedRoundsDontCount({checked}: ComponentProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-6 w-6 lg:h-10 lg:w-10 relative">
        <StarIcon className="h-full w-full absolute text-black fill-white"/>
        {checked &&
            <XIcon className="text-slate-700 absolute h-6 w-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}
      </div>
      =
      <div
        className="bg-white rounded-sm grid grid-cols-2 items-center justify-center gap-y-0.5 gap-x-1 px-1.5 py-1 relative shadow">
        {[0, 1, 2, 3, 4, 5].map((i) => <div key={i} className="bg-black rounded-full h-1 w-1"/>)}
        <XIcon className="text-red-700 absolute h-8 w-8 mt-3 ml-0.5"/>
      </div>
    </div>
  );
}
'use client';

import React from 'react';
import { OctagonIcon, XIcon } from '@/ui/icons';

interface ComponentProps {
  checked: boolean;
}

export default function PlusThirteen({checked}: ComponentProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="h-6 w-6 lg:h-10 lg:w-10 relative">
        <OctagonIcon className="h-full w-full absolute text-black fill-white"/>
        {checked &&
            <XIcon className="text-slate-700 absolute h-6 w-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}
      </div>
      =
      <div className="bg-white border-2 border-slate-400 flex rounded px-1">
        +13
      </div>
    </div>
  );
}
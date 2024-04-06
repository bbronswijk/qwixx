'use client';

import React, { useEffect } from 'react';
import { CircleIcon, XIcon } from '@/ui/icons';
import useVariantBStore from '@/app/variant-b/variant-b.store';

interface ComponentProps {
  checked: boolean;
}

export default function CheckTwoInLowestRow({checked}: ComponentProps) {
  const checkLowestRowTwice = useVariantBStore.use.checkLowestRowTwice();

  useEffect(() => {
    if (checked) {
      checkLowestRowTwice();
    }
  }, [checked]);


  return (
    <div className="flex items-center gap-1">
      <div className="h-6 w-6 lg:h-10 lg:w-10 relative">
        <CircleIcon className="h-full w-full absolute text-black fill-white"/>
        {checked &&
            <XIcon className="text-slate-700 absolute h-6 w-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}
      </div>
      =
      <div className="bg-white border-2 border-slate-400 flex rounded">
        <XIcon className="text-slate-700 h-3 w-3"/>
      </div>
      <div className="bg-white border-2 border-slate-400 flex rounded">
        <XIcon className="text-slate-700 h-3 w-3"/>
      </div>
    </div>
  );
}
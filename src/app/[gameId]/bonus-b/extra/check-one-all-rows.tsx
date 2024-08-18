'use client';

import React, { useEffect } from 'react';
import { RotatedSquareIcon, XIcon } from '@/ui/icons';
import QwixxStore from '@/state/store';

interface ComponentProps {
  checked: boolean;
}

export default function CheckOneAllRows({checked}: ComponentProps) {
  const checkOneInEachRow = QwixxStore.use.checkOneInEachRow();

  useEffect(() => {
    if (checked) {
      checkOneInEachRow();
    }
  }, [checked]);

  return (
    <div className="flex items-center gap-1">
      <div className="h-6 w-6 lg:h-10 lg:w-10 relative">
        <RotatedSquareIcon className="h-full w-full absolute text-black fill-white"/>
        {checked &&
            <XIcon className="text-slate-700 absolute h-6 w-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>}
      </div>
      =
      <div className="grid grid-cols-2 gap-1">
        <div className="border-2 bg-red-100 border-red-800 flex rounded">
          <XIcon className="text-slate-700 h-3 w-3"/>
        </div>
        <div className="border-2 bg-yellow-100 border-yellow-600 flex rounded">
          <XIcon className="text-slate-700 h-3 w-3"/>
        </div>
        <div className="border-2 bg-green-100 border-green-700 flex rounded">
          <XIcon className="text-slate-700 h-3 w-3"/>
        </div>
        <div className="border-2 bg-blue-100 border-blue-800 flex rounded">
          <XIcon className="text-slate-700 h-3 w-3"/>
        </div>
      </div>
    </div>
  );
}
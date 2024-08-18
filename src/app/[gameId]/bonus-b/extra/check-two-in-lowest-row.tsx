'use client';

import React, { useEffect } from 'react';
import { CircleIcon, XIcon } from '@/ui/icons';
import QwixxStore from '@/state/store';
import { allRowsWithLeastChecksSelector } from "@/state/selectors";
import { useToast } from "@/ui/use-toast";
import { rowToColor } from "@/data/color";

interface ComponentProps {
  checked: boolean;
}

/**
 * Return
 * Red, Green or Blue
 * Red or Green
 */
const chain = (items: string[]): string => `${items.slice(0, -1).join(', ')} or ${items[items.length - 1]}`;

export default function CheckTwoInLowestRow({checked}: ComponentProps) {
  const checkLowestRowTwice = QwixxStore.use.checkLowestRowTwice();
  const allRowsWithLeastChecks = QwixxStore(allRowsWithLeastChecksSelector);
  const {toast} = useToast()

  useEffect(() => {
    if (checked) {
      if (allRowsWithLeastChecks.length > 1) {
        toast({
          title: 'You may add two checks to one of the lowest rows',
          description: `Choose either the ${chain(allRowsWithLeastChecks.map(({row}) => rowToColor(row)))} row`,
        })
      } else {
        checkLowestRowTwice();
      }
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
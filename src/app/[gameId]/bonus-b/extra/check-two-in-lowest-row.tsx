"use client";

import React, { useEffect } from "react";
import { CircleIcon, XIcon } from "@/ui/icons";
import QwixxStore from "@/state/store";
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
const chain = (items: string[]): string => `${items.slice(0, -1).join(", ")} or ${items[items.length - 1]}`;

export default function CheckTwoInLowestRow({ checked }: ComponentProps) {
  const checkLowestRowTwice = QwixxStore.use.checkLowestRowTwice();
  const allRowsWithLeastChecks = QwixxStore(allRowsWithLeastChecksSelector);
  const { toast } = useToast();

  useEffect(() => {
    if (checked) {
      if (allRowsWithLeastChecks.length > 1) {
        toast({
          title: "You may add two checks to one of the lowest rows",
          description: `Choose either the ${chain(allRowsWithLeastChecks.map(({ row }) => rowToColor(row)))} row`,
        });
      } else {
        checkLowestRowTwice();
      }
    }
  }, [checked]);

  return (
    <div className='flex items-center gap-1'>
      <div className='relative h-6 w-6 lg:h-10 lg:w-10'>
        <CircleIcon className='absolute h-full w-full fill-white text-black' />
        {checked && <XIcon className='absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 text-slate-700' />}
      </div>
      =
      <div className='flex rounded border-2 border-slate-400 bg-white'>
        <XIcon className='h-3 w-3 text-slate-700' />
      </div>
      <div className='flex rounded border-2 border-slate-400 bg-white'>
        <XIcon className='h-3 w-3 text-slate-700' />
      </div>
    </div>
  );
}

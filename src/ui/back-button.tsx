'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@/ui/icons';

export default function BackButton({onClick}: { onClick?: () => void }) {
  const router = useRouter();

  return (
    <button className="flex items-center justify-center w-fit p-1.5 rounded-lg bg-slate-200"
            onClick={() => {
              onClick?.();
              router.back();
            }}>
      <ChevronLeftIcon/>
    </button>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@/ui/icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="flex items-center justify-center p-1.5 rounded-lg bg-slate-200"
            onClick={() => router.back()}>
      <ChevronLeftIcon/>
    </button>
  );
}

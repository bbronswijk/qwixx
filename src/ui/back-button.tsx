'use client';

import { useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@/ui/icons';

export default function BackButton() {
  const router = useRouter();

  return (
    <button className="fixed top-3 left-3 flex items-center justify-center p-1.5 rounded-lg bg-slate-200"
            onClick={() => router.push('/')}>
      <ChevronLeftIcon/>
    </button>
  );
}

"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/ui/icons";

export default function BackButton({ onClick }: { onClick?: () => void }) {
  const router = useRouter();

  return (
    <button
      className='flex w-fit items-center justify-center rounded-lg bg-slate-200 p-1.5'
      onClick={() => {
        onClick?.();
        router.back();
      }}
    >
      <ChevronLeftIcon />
    </button>
  );
}

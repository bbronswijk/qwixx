'use client';

import { usePusher } from "@/pusher/pusher.context";
import Image from 'next/image';
import { cn } from "@/utils/cn";

export const Members = ({className}: { className?: string }) => {
  const {members} = usePusher();

  return (
    <footer className={cn(className, "gap-2")}>
      {members.map((member) => (
        <Image key={member.nickname} className="relative h-10 w-10 md:h-12 md:w-12"
               src={`https://avatar.iran.liara.run/username?username=${member.nickname}`} alt={member.nickname}
               height={48} width={48}/>
      ))}
    </footer>
  )
}
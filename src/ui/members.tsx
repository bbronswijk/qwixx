'use client';

import { usePusher } from "@/pusher/pusher.context";
import Image from 'next/image';

export const Members = () => {
  const {members} = usePusher();

  return (
    <footer className="space-y-2 gap-2 w-12">
      {members.map((member) => (
        <Image key={member.nickname} className="relative h-10 w-10 md:h-12 md:w-12"
               src={`https://avatar.iran.liara.run/username?username=${member.nickname}`} alt={member.nickname}
               height={48} width={48}/>
      ))}
    </footer>
  )
}
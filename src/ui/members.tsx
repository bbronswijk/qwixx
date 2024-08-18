'use client';

import { usePusher } from "@/pusher/pusher.context";
import Image from 'next/image';

export const Members = () => {
  const {members} = usePusher();

  return (
    <footer className="gap-2 max-h-72 flex flex-col flex-wrap">
      {members.map((member) => (
        <Image key={member.nickname} className="relative h-10 w-10"
               src={`https://avatar.iran.liara.run/username?username=${member.nickname}`} alt={member.nickname}
               height={48} width={48}/>
      ))}
    </footer>
  )
}
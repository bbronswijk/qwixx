"use client";

import { usePusher } from "@/pusher/pusher.context";
import Image from "next/image";

export const Members = () => {
  const { members } = usePusher();

  return (
    <footer className='flex max-h-72 flex-col flex-wrap gap-2'>
      {members.map((member) => (
        <Image
          key={member.nickname}
          className='relative h-10 w-10'
          src={`https://avatar.iran.liara.run/username?username=${member.nickname}`}
          alt={member.nickname}
          height={48}
          width={48}
        />
      ))}
    </footer>
  );
};

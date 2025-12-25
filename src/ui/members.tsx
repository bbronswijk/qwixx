"use client";

import { usePusher } from "@/pusher/pusher.context";
import { MemberAvatar } from "@/ui/MemberAvatar";

export const Members = () => {
  const { members } = usePusher();

  return (
    <footer className='flex max-h-72 flex-col flex-wrap gap-2'>
      {members.map((member) => (
        <MemberAvatar key={member.nickname} className='relative h-10 w-10' height={48} width={48} nickName={member.nickname} />
      ))}
    </footer>
  );
};

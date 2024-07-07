import { usePusher } from "@/pusher/use-pusher.hook";
import Image from 'next/image';

export const Members = () => {
  const {members} = usePusher();

  return (
    <footer className="space-y-2">
      {members.map((member) => (
        <div key={member.nickname} className="relative">
          <span className="absolute h-3 w-3 bg-green-500 rounded-full right-0"></span>
          <Image src={`https://avatar.iran.liara.run/username?username=${member.nickname}`} alt={member.nickname}
                 height={40} width={40}/>
        </div>
      ))}
    </footer>
  )
}
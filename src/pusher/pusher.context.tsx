'use client'

import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { pusherClient } from "@/pusher/pusher.client";
import { PresenceChannel } from "pusher-js";
import { useAuth } from "@/app/auth/authentication.context";
import { Member, MemberInfo } from "@/pusher/member.model";
import { useToast } from "@/components/ui/use-toast";
import { PusherEvent, PusherLockRowPayload } from "@/pusher/pusher.model";
import QwixxStore from "@/state/store";
import { useParams } from "next/navigation";

interface PusherContextValue {
  members: MemberInfo[];
}

export const PusherContext = createContext<PusherContextValue | null>(null);

export const usePusher = () => {
  const context = useContext(PusherContext);

  if (!context) {
    throw new Error('MemberContext has not been initialized.');
  }

  return context;
};


export const Pusher = ({children}: PropsWithChildren) => {
  const [members, setMembers] = useState<MemberInfo[]>([])
  const {userName} = useAuth();
  const {toast} = useToast();
  const lockRow = QwixxStore.use.lockRow();
  const {roomId} = useParams<{ roomId: string }>()

  // Move to custom hook
  useEffect(() => {
    if (!userName || !roomId) {
      return;
    }

    // TODO figure out how to get the correct type.
    // TODO include qwixx variant???
    const channel = pusherClient.subscribe(`presence-${roomId}`) as PresenceChannel;

    channel.bind("pusher:subscription_succeeded", () => {
      setMembers(Object.values(channel.members.members));
    });
    channel.bind("pusher:member_added", (member: Member) => {
      setMembers((members) => [...members, member.info]);
      toast({description: `${member.info.nickname} joined the game`});
    });
    channel.bind("pusher:member_removed", (member: Member) => {
      setMembers((members) => members.filter((m: MemberInfo) => m.nickname !== member.info.nickname));
      toast({description: `${member.info.nickname} left the game`});
    });
    channel.bind(PusherEvent.lockRow, ({color}: PusherLockRowPayload) => {
      console.log()
      lockRow(color);
    })

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [toast, roomId, userName]);

  return (
    <PusherContext.Provider value={{members}}>
      {children}
    </PusherContext.Provider>
  );
}
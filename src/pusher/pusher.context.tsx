'use client'

import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/pusher/pusher.client";
import { PresenceChannel } from "pusher-js";
import { useAuth } from "@/auth/authentication.context";
import { Member, MemberInfo } from "@/pusher/member.model";
import { useToast } from "@/ui/use-toast";
import { PusherEvent, PusherLockRowPayload, PusherShareScorePayload } from "@/pusher/pusher.model";
import QwixxStore from "@/state/store";
import { useParams } from "next/navigation";

interface PusherContextValue {
  members: MemberInfo[];
  channel: PresenceChannel | undefined;
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
  const channel = useRef<PresenceChannel>();
  const {userName} = useAuth();
  const {toast} = useToast();
  const lockRow = QwixxStore.use.rowGotLockedBySomeoneElse();
  const {roomId} = useParams<{ roomId: string }>()

  // Move to custom hook
  useEffect(() => {
    if (!userName || !roomId) {
      return;
    }

    pusherClient.bind("pusher:error", ({code, message}: { code: number | null; message: string }) => {
      if (code) {
        toast({description: message, variant: 'destructive'})
      }
    });

    // TODO include qwixx variant???
    channel.current = pusherClient.subscribe(`presence-${roomId}`) as PresenceChannel;

    channel.current.bind("pusher:member_added", (member: Member) => {
      setMembers((members) => [...members, member.info]);
      toast({description: `${member.info.nickname} joined the game`});
    });
    channel.current.bind("pusher:member_removed", (member: Member) => {
      setMembers((members) => members.filter((m: MemberInfo) => m.nickname !== member.info.nickname));
      toast({description: `${member.info.nickname} left the game`});
    });
    channel.current.bind(PusherEvent.lockRow, ({color}: PusherLockRowPayload) => {
      lockRow(color);
    })
    channel.current.bind(PusherEvent.shareScore, ({nickname, score}: PusherShareScorePayload) => {
      setMembers((members) => members.map((member) => {
        if (member.nickname === nickname) {
          return {...member, score};
        }
        return member;
      }));
    });
    return () => {
      channel.current?.unbind_all();
      channel.current?.unsubscribe();
    };
  }, [toast, roomId, userName]);

  return (
    <PusherContext.Provider value={{members, channel: channel.current}}>
      {children}
    </PusherContext.Provider>
  );
}
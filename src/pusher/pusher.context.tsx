'use client'

import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/pusher/pusher.client";
import { PresenceChannel } from "pusher-js";
import { Member, MemberInfo } from "@/pusher/member.model";
import { useToast } from "@/ui/use-toast";
import { PusherEvent, PusherLockRowPayload, PusherShareScorePayload } from "@/pusher/pusher.model";
import QwixxStore from "@/state/store";
import { useParams } from "next/navigation";
import { useVariant } from "@/context/variant.context";

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
  const {toast} = useToast();
  const variant = useVariant();
  const lockRow = QwixxStore.use.rowGotLockedBySomeoneElse();
  const {roomId} = useParams<{ roomId: string }>()

  useEffect(() => {
    channel.current = pusherClient.subscribe(`presence-${roomId}-${variant}`) as PresenceChannel;

    channel.current.bind("pusher:error", ({code, message}: { code: number | null; message: string }) => {
      toast({description: message, variant: 'destructive'})
    }).bind("pusher:subscription_succeeded", () => {
      setMembers(Object.values(channel.current?.members.members));
    }).bind("pusher:member_added", (member: Member) => {
      setMembers((members) => [...members, member.info]);
    }).bind("pusher:member_removed", (member: Member) => {
      setMembers((members) => members.filter((m: MemberInfo) => m.nickname !== member.info.nickname));
    }).bind(PusherEvent.lockRow, ({color}: PusherLockRowPayload) => {
      lockRow(color);
    }).bind(PusherEvent.shareScore, ({nickname, score}: PusherShareScorePayload) => {
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
  }, []);

  return (
    <PusherContext.Provider value={{members, channel: channel.current}}>
      {children}
    </PusherContext.Provider>
  );
}
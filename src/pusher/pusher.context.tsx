'use client'

import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from "react";
import { pusherClient } from "@/pusher/pusher.client";
import { PresenceChannel } from "pusher-js";
import { Member, MemberInfo } from "@/pusher/member.model";
import { useToast } from "@/ui/use-toast";
import { PusherEvent } from "@/pusher/pusher.model";
import QwixxStore from "@/state/store";
import { useVariant } from "@/context/variant.context";
import { useGamePin } from "@/utils/use-game-pin.hook";

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
  const channel = useRef<PresenceChannel>();
  const {toast} = useToast();
  const variant = useVariant();
  const markAsGameCompleted = QwixxStore.use.markAsGameCompleted();
  const fetchScore = QwixxStore.use.fetchScore();
  const pin = useGamePin();

  useEffect(() => {
    channel.current = pusherClient.subscribe(`presence-${pin}-${variant}`) as PresenceChannel;

    channel.current.bind("pusher:error", ({code, message}: { code: number | null; message: string }) => {
      toast({description: message, variant: 'destructive'})
    }).bind("pusher:subscription_succeeded", () => {
      setMembers(Object.values(channel.current?.members.members));
    }).bind("pusher:member_added", (member: Member) => {
      setMembers((members) => [...members, member.info]);
    }).bind("pusher:member_removed", (member: Member) => {
      setMembers((members) => members.filter((m: MemberInfo) => m.nickname !== member.info.nickname));
    })
      .bind(PusherEvent.shareScore, () => fetchScore(pin))
      .bind(PusherEvent.endGame, () => markAsGameCompleted());

    return () => {
      channel.current?.unbind_all();
      channel.current?.unsubscribe();
    };
  }, []);

  return (
    <PusherContext.Provider value={{members}}>
      {children}
    </PusherContext.Provider>
  );
}
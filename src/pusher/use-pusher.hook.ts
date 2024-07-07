import { useEffect, useState } from "react";
import { pusherClient } from "@/pusher/pusher.client";
import { PresenceChannel } from "pusher-js";
import { useAuth } from "@/app/auth/authentication.context";
import { Member, MemberInfo } from "@/pusher/member.model";
import { useToast } from "@/components/ui/use-toast";
import { PusherEvent, PusherLockRowPayload } from "@/pusher/pusher.model";
import QwixxStore from "@/state/store";

const roomId = 1234;

export const usePusher = () => {
  const [members, setMembers] = useState<MemberInfo[]>([])
  const {userName} = useAuth();
  const {toast} = useToast();
  const lockRow = QwixxStore.use.lockRow();

  // Move to custom hook
  useEffect(() => {
    if (!userName) {
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
      toast({description: `${member.info.nickname} joined the room`});
    });
    channel.bind("pusher:member_removed", (member: Member) => {
      setMembers((members) => members.filter((m: MemberInfo) => m.nickname !== member.info.nickname));
      toast({description: `${member.info.nickname} left the room`});
    });
    channel.bind(PusherEvent.lockRow, ({color}: PusherLockRowPayload) => {
      lockRow(color);
    })

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [toast, userName]);

  return {members}
}
import 'server-only'

import { pusher } from '@/pusher/pusher';
import { PresenceChannelData } from "pusher";
import { cookies } from "next/headers";
import { NICKNAME_COOKIE_KEY } from "@/auth/nickname-cookie.key";
import { MemberInfo } from "@/pusher/member.model";

export async function POST(req: Request) {
  const formData = await req.formData();
  const socketId = formData.get('socket_id') as string;
  const channel = formData.get('channel_name') as string;

  const cookieStore = cookies()
  const nickName = cookieStore.get(NICKNAME_COOKIE_KEY)

  if (!nickName) {
    return Response.json({error: `No user id set: ${nickName}`}, {status: 401})
  }

  if (!socketId) {
    return Response.json({error: 'No socket id provided by Pusher'}, {status: 500})
  }

  const user: PresenceChannelData = {
    user_id: nickName.value.toLowerCase(),
    user_info: {
      nickname: nickName.value,
      avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${nickName.value}`,
    } satisfies MemberInfo
  };

  const authResponse = pusher.authorizeChannel(socketId, channel, user);

  return Response.json(authResponse)
}

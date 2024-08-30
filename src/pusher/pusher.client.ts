"use client";

import Pusher from "pusher-js";
import { env } from "@/env";

export const pusherClient = new Pusher(env.NEXT_PUBLIC_PUSHER_APP_KEY, {
  cluster: "eu",
  enableStats: true,
  channelAuthorization: {
    endpoint: "/api/pusher/auth",
    transport: "ajax",
  },
});

import Pusher from 'pusher';
import { env } from '@/env';

const pusherSingleton = () => new Pusher({
  appId: env.PUSHER_APP_ID,
  key: env.NEXT_PUBLIC_PUSHER_APP_KEY,
  secret: env.PUSHER_APP_SECRET,
  cluster: "eu",
  useTLS: true
});

const globalForPusher = globalThis as unknown as {
  pusher: ReturnType<typeof pusherSingleton> | undefined
}
export const pusher = globalForPusher.pusher ?? pusherSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPusher.pusher = pusher
}
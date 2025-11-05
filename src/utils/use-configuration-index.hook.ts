import { useAuth } from "@/auth/authentication.context";
import { usePusher } from "@/pusher/pusher.context";
import { useSearchParams } from "next/navigation";
import { useGamePin } from "@/context/game-pin.context";

/**
 * Within a single game all players should have a different configuration.
 * However, people should get the same configuration whenever they accidentally refresh the page.
 */
export const useConfigurationIndex = (): number => {
  const { nickname } = useAuth();
  const pin = useGamePin();
  const { members } = usePusher();

  // Allow forcing a specific configuration via URL param for testing purposes.
  const searchParams = useSearchParams();
  const forceConfiguration = searchParams.get("forceConfiguration");

  return Number(forceConfiguration) ?? getMemberIndex(nickname, members, pin);
};

/**
 * Use the game pin as randomizer so people with the A or B in their name not always start with the same configuration
 */
export const getMemberIndex = (nickname: string, members: { nickname: string }[], gamePin: number): number => {
  const names = members.map((member) => member.nickname).toSorted();
  return names.indexOf(nickname) + Number(gamePin.toString()[0]);
};

import { useAuth } from "@/auth/authentication.context";
import { useGamePin } from "@/utils/use-game-pin.hook";
import { usePusher } from "@/pusher/pusher.context";
import { useSearchParams } from "next/navigation";

/**
 * Within a single game all players should have a different configuration.
 * However, people should get the same configuration whenever they accidentally refresh the page.
 * Use the game pin as randomizer so people with the A or B in their name not always start with the same configuration
 */
export const useConfigurationIndexHook = (): number => {
  const { nickname } = useAuth();
  const pin = useGamePin();
  const { members } = usePusher();

  // Allow forcing a specific configuration via URL param for testing purposes.
  const searchParams = useSearchParams();
  const forceConfiguration = searchParams.get("forceConfiguration");

  const names = members.map((member) => member.nickname).toSorted();

  return Number(forceConfiguration) ?? names.indexOf(nickname) + Number(pin.toString()[0]);
};

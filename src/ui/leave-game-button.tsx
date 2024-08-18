import { leaveGameAction } from "@/actions/game.actions";
import { useAuth } from "@/auth/authentication.context";
import { useGamePin } from "@/utils/use-game-pin.hook";
import BackButton from "@/ui/back-button";

export const LeaveGameButton = () => {
  const {nickname} = useAuth();
  const pin = useGamePin();

  return <BackButton onClick={() => leaveGameAction(pin, nickname as string)}/>;
}
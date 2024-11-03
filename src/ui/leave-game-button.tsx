import { leaveGameAction } from "@/actions/game.actions";
import { useAuth } from "@/auth/authentication.context";
import { useGamePin } from "@/utils/use-game-pin.hook";
import BackButton from "@/ui/back-button";
import { useEffect, useRef } from "react";

const isDevelopment = process.env.NODE_ENV === "development";

export const LeaveGameButton = () => {
  const { nickname } = useAuth();
  const pin = useGamePin();
  const mounted = useRef(false);

  useEffect(() => {
    return () => {
      // Prevent the leave game action from being called on the first render in development mode
      if (isDevelopment && !mounted.current) {
        mounted.current = true;
        return;
      }
      leaveGameAction(pin, nickname as string);
    };
  }, []);

  return <BackButton />;
};

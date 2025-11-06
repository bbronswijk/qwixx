import { leaveGameAction } from "@/actions/game.actions";
import { useAuth } from "@/auth/authentication.context";
import BackButton from "@/ui/back-button";
import { useEffect, useRef } from "react";
import { useGamePin } from "@/context/game-pin.context";
import { useActions } from "@/state/store";

const isDevelopment = process.env.NODE_ENV === "development";

export const LeaveGameButton = () => {
  const { nickname } = useAuth();
  const { reset } = useActions();
  const pin = useGamePin();
  const mounted = useRef(false);

  useEffect(() => {
    return () => {
      // Prevent the leave game action from being called on the first render in development mode
      if (isDevelopment && !mounted.current) {
        mounted.current = true;
        return;
      }
      reset();
      leaveGameAction(pin, nickname as string);
    };
  }, []);

  return <BackButton />;
};

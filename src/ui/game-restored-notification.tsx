"use client";

import { useEffect } from "react";
import { useRestoredFromPersist, useActions } from "@/state/store";
import { toast } from "@/ui/use-toast";
import { ToastAction } from "@/ui/toast";

/**
 * Component that shows a notification when the game is restored from localStorage.
 * Allows the user to reset the game to start fresh.
 */
export function GameRestoredNotification() {
  const restoredFromPersist = useRestoredFromPersist();
  const { reset } = useActions();

  useEffect(() => {
    if (restoredFromPersist) {
      const { dismiss } = toast({
        title: "Game Restored",
        description: "Your unfinished game has been restored.",
        duration: 5000,
        action: (
          <ToastAction
            altText='Reset game'
            onClick={() => {
              reset();
              dismiss();
            }}
          >
            Reset Game
          </ToastAction>
        ),
      });
    }
  }, [restoredFromPersist]);

  return null;
}

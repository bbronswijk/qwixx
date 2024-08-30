"use client";

import React, { useEffect } from "react";
import { useTotalSelector } from "@/state/selectors";
import { variantATiles } from "@/app/[gameId]/bonus-a/variant-a.config";
import { Variant } from "@/context/variant.context";
import { captureException } from "@sentry/core";
import { UnExpectedError } from "@/ui/error-page";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const totalScore = useTotalSelector(variantATiles);
  const variant = Variant.BONUS_A;

  useEffect(() => {
    captureException(error);
  }, []);

  return <UnExpectedError variant={variant} totalScore={totalScore} reset={reset} />;
}

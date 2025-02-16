"use client";

import React, { useEffect } from "react";
import { useTotalSelector } from "@/state/selectors";
import { Variant } from "@/context/variant.context";
import { captureException } from "@sentry/core";
import { stepsTiles } from "@/app/[gameId]/steps/steps.config";
import { UnExpectedError } from "@/ui/error-page";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const totalScore = useTotalSelector(stepsTiles);
  const variant = Variant.STEPS;

  useEffect(() => {
    captureException(error);
  }, []);

  return <UnExpectedError variant={variant} totalScore={totalScore} reset={reset} />;
}

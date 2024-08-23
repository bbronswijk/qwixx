'use client';

import React, { useEffect } from 'react';
import { useTotalSelector } from '@/state/selectors';
import { Variant } from "@/context/variant.context";
import { variantBTiles } from "@/app/[gameId]/bonus-b/variant-b.config";
import { captureException } from "@sentry/core";
import { UnExpectedError } from "@/ui/error-page";

export default function Error({error, reset}: { error: Error & { digest?: string }; reset: () => void }) {
  const totalScore = useTotalSelector(variantBTiles);
  const variant = Variant.BONUS_B;

  useEffect(() => {
    captureException(error);
  }, []);

  return (
    <UnExpectedError variant={variant} totalScore={totalScore} reset={reset}/>
  );
}

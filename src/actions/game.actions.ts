"use server";

import { Variant } from "@/context/variant.context";
import prisma from "../../prisma/db";
import { State } from "@/state/store";
import { Game } from "@prisma/client";
import { env } from "@/env";
import { Resend } from "resend";

function generateGamePin(): number {
  return Math.floor(Math.random() * (9999 - 1111 + 1)) + 1111;
}

/**
 * Create the game and add the user to the game
 */
export async function createGameAction(variant: Variant, nickname: string): Promise<Game> {
  if (!variant) {
    throw new Error("No variant provided");
  }

  const game = await prisma.game.create({
    data: {
      pin: generateGamePin(),
      variant: variant,
    },
  });

  await prisma.playerGameScore.create({
    data: {
      gameId: game.id,
      nickname,
    },
  });

  return game;
}

/**
 * Join the game based on the provided pin
 */
export async function joinGameAction(pin: number, nickname: string) {
  const game = await prisma.game.findFirst({
    where: { pin, finishedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!game) {
    return {
      error: {
        title: "Game not found",
        description: "Use the game pin provided by the host, or create a new game.",
      },
    };
  }

  try {
    await prisma.playerGameScore.create({
      data: {
        gameId: game.id,
        nickname,
      },
    });
  } catch (e: any) {
    if (e.code === "P2002") {
      return {
        error: {
          title: `"${nickname}" is already taken`,
          description: "Go back and use a different user name.",
        },
      };
    }
    return {
      error: {
        title: `Something went wrong, but we don't know what`,
        description: e?.message ?? null,
      },
    };
  }

  return game;
}

/**
 * Join the game based on the provided pin
 */
export async function leaveGameAction(pin: number, nickname: string) {
  const game = await prisma.game.findFirst({
    where: { pin, finishedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!game) {
    return;
  }

  await prisma.playerGameScore.delete({
    where: {
      unique_player_game: {
        gameId: game.id,
        nickname,
      },
    },
  });
}

/**
 * Publish the final score of a user of the game
 */
export async function saveScore(pin: number, nickname: string, score: number, state: State) {
  const game = await prisma.game.findFirst({
    where: { pin },
    orderBy: { createdAt: "desc" },
  });

  if (!game) {
    return;
  }

  await prisma.playerGameScore.update({
    where: {
      unique_player_game: {
        gameId: game.id,
        nickname,
      },
    },
    data: {
      score,
      state: JSON.stringify(state),
    },
  });
}

/**
 * Publish changes a user of the game for debugging purposes in case something went wrong.
 */
export async function saveChanges(pin: number, nickname: string, state: State) {
  const game = await prisma.game.findFirst({
    where: { pin },
    orderBy: { createdAt: "desc" },
  });

  if (!game) {
    return;
  }

  await prisma.playerGameScore.update({
    where: {
      unique_player_game: {
        gameId: game.id,
        nickname,
      },
    },
    data: {
      state: JSON.stringify(state),
    },
  });
}

/**
 * Fetch the latest state from the DB.
 */
export async function getScores(pin: number) {
  const game = await prisma.game.findFirst({
    where: { pin },
    orderBy: { createdAt: "desc" },
  });

  if (!game) {
    return [];
  }

  return prisma.playerGameScore.findMany({
    where: {
      gameId: game.id,
    },
    select: {
      nickname: true,
      score: true,
    },
  });
}

/**
 * Mark the game as ended.
 */
export async function endGameAction(pin: number) {
  const game = await prisma.game.findFirst({
    where: { pin, finishedAt: null },
    orderBy: { createdAt: "desc" },
  });

  // Return if the game was already marked as finished.
  if (!game) {
    return;
  }

  return prisma.game.update({
    where: { id: game.id },
    data: { finishedAt: new Date() },
  });
}

export async function notifyAdminAboutError(pin: number) {
  if (env.VERCEL_ENV !== "production" || !env.RESEND) {
    return;
  }

  const resend = new Resend(env.RESEND);

  await resend.emails.send({
    from: "noreply@qwixx-eight.app",
    to: "brambronswijk@gmail.com",
    subject: "An unexpected error occurred",
    html: `<p>Something happend for game ${pin}!</p>`,
  });
}

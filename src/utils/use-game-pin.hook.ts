import { useParams } from "next/navigation";

export function useGamePin(): number {
  const {gameId} = useParams<{ gameId: string }>();

  if (!gameId) {
    throw new Error('gameId is missing or invalid. This hook should only be used within a [gameId] route');
  }

  return Number(gameId);
}
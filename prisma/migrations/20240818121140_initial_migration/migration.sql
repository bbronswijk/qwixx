-- CreateTable
CREATE TABLE "Game"
(
    "id"         UUID         NOT NULL,
    "pin"        INTEGER      NOT NULL,
    "variant"    TEXT         NOT NULL,
    "createdAt"  TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finishedAt" TIMESTAMP(3),

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerGameScore"
(
    "id"       UUID NOT NULL,
    "gameId"   UUID NOT NULL,
    "nickname" TEXT NOT NULL,
    "score"    INTEGER,
    "state"    JSONB,

    CONSTRAINT "PlayerGameScore_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerGameScore_gameId_nickname_key" ON "PlayerGameScore" ("gameId", "nickname");

-- AddForeignKey
ALTER TABLE "PlayerGameScore"
    ADD CONSTRAINT "PlayerGameScore_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

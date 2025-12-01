-- CreateEnum
CREATE TYPE "public"."GameStatus" AS ENUM ('PLAYING', 'BACKLOG', 'COMPLETED');

-- CreateTable
CREATE TABLE "public"."Game" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "status" "public"."GameStatus" NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PCPart" (
    "id" TEXT NOT NULL,
    "component" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "notes" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PCPart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."PCBuildStory" (
    "id" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PCBuildStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Console" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Console_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."GamingPhoto" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GamingPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Game_isCurrent_idx" ON "public"."Game"("isCurrent");

-- CreateIndex
CREATE INDEX "Game_status_idx" ON "public"."Game"("status");

-- CreateIndex
CREATE INDEX "PCPart_order_idx" ON "public"."PCPart"("order");

-- CreateIndex
CREATE INDEX "Console_order_idx" ON "public"."Console"("order");

-- CreateIndex
CREATE INDEX "GamingPhoto_order_idx" ON "public"."GamingPhoto"("order");

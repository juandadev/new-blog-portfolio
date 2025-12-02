-- CreateEnum
CREATE TYPE "public"."CoffeeGearCategory" AS ENUM ('machine', 'grinder', 'accessories', 'beans');

-- CreateTable
CREATE TABLE "public"."CoffeeGear" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" "public"."CoffeeGearCategory" NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeeGear_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoffeeStory" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeeStory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoffeeJourneyMilestone" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeeJourneyMilestone_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CoffeePhoto" (
    "id" TEXT NOT NULL,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "caption" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CoffeePhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CoffeeGear_order_idx" ON "public"."CoffeeGear"("order");

-- CreateIndex
CREATE INDEX "CoffeeGear_category_idx" ON "public"."CoffeeGear"("category");

-- CreateIndex
CREATE INDEX "CoffeeJourneyMilestone_order_idx" ON "public"."CoffeeJourneyMilestone"("order");

-- CreateIndex
CREATE INDEX "CoffeePhoto_order_idx" ON "public"."CoffeePhoto"("order");

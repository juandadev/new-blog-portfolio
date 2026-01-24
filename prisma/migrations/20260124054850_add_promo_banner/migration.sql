-- CreateEnum
CREATE TYPE "public"."BannerVariant" AS ENUM ('DEFAULT', 'INFO', 'SUCCESS', 'WARNING', 'PROMO');

-- CreateTable
CREATE TABLE "public"."PromoBanner" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" VARCHAR(120) NOT NULL,
    "imageUrl" TEXT,
    "linkUrl" TEXT,
    "linkText" TEXT,
    "icon" TEXT,
    "variant" "public"."BannerVariant" NOT NULL DEFAULT 'DEFAULT',
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PromoBanner_pkey" PRIMARY KEY ("id")
);

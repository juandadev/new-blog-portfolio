-- CreateEnum
CREATE TYPE "public"."VaultProjectCategory" AS ENUM ('web_app', 'mobile_app', 'landing_page', 'dashboard', 'ui_components', 'branding', 'other');

-- CreateTable
CREATE TABLE "public"."VaultProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail" TEXT NOT NULL,
    "figmaUrl" TEXT NOT NULL,
    "category" "public"."VaultProjectCategory" NOT NULL,
    "year" TEXT NOT NULL,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VaultProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."VaultStory" (
    "id" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "intro" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VaultStory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "VaultProject_order_idx" ON "public"."VaultProject"("order");

-- CreateIndex
CREATE INDEX "VaultProject_category_idx" ON "public"."VaultProject"("category");

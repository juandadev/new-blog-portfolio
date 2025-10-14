-- CreateTable
CREATE TABLE "public"."Tool" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "icon" TEXT,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tool_slug_key" ON "public"."Tool"("slug");

-- CreateIndex
CREATE INDEX "idx_tools_category" ON "public"."Tool"("category");

-- CreateIndex
CREATE INDEX "idx_tools_slug" ON "public"."Tool"("slug");

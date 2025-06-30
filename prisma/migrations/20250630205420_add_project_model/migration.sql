-- CreateEnum
CREATE TYPE "AppType" AS ENUM ('WEB', 'DESKTOP', 'IOS', 'ANDROID', 'CLI', 'LIBRARY', 'OTHER');

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "technologies" TEXT[],
    "applicationType" "AppType" NOT NULL,
    "demoUrl" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "postTitle" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "coverImage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

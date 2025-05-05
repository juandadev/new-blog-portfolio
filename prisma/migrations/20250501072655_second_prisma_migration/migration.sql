/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
ADD COLUMN     "githubId" TEXT;

-- CreateIndex
CREATE INDEX "Invitation_email_idx" ON "Invitation"("email");

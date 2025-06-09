-- CreateEnum
CREATE TYPE "SubscriberStatus" AS ENUM ('SUBSCRIBED', 'UNSUBSCRIBED');

-- AlterTable
ALTER TABLE "Subscriber" ADD COLUMN     "status" "SubscriberStatus" NOT NULL DEFAULT 'SUBSCRIBED',
ADD COLUMN     "unsubscribedAt" TIMESTAMP(3);

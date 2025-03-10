/*
  Warnings:

  - You are about to drop the column `actor_id` on the `events` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "events_actor_id_idx";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "actor_id";

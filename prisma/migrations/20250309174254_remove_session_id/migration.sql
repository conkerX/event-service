/*
  Warnings:

  - You are about to drop the column `session_id` on the `events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "events" DROP COLUMN "session_id";

/*
  Warnings:

  - The values [PRIORITY_CHANGED,LINKED,UNLINKED] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('CREATED', 'STATUS_CHANGE', 'ASSIGNMENT', 'MEMBER_ADDED', 'MEMBER_REMOVED', 'COMMENT_ADDED', 'DUE_DATE_CHANGED', 'PROCESS_INITIATED', 'INSTANCE_COMPLETED');
ALTER TABLE "events" ALTER COLUMN "event_type" TYPE "EventType_new" USING ("event_type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;

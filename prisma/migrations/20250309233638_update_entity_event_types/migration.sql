/*
  Warnings:

  - The values [CONTROL_INSTANCE,TEAM,USER] on the enum `EntityType` will be removed. If these variants are still used in the database, this will fail.
  - The values [MEMBER_ADDED,MEMBER_REMOVED] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EntityType_new" AS ENUM ('TASK', 'CONTROL', 'PROCESS', 'PROCESS_INSTANCE');
ALTER TABLE "events" ALTER COLUMN "entity_type" TYPE "EntityType_new" USING ("entity_type"::text::"EntityType_new");
ALTER TYPE "EntityType" RENAME TO "EntityType_old";
ALTER TYPE "EntityType_new" RENAME TO "EntityType";
DROP TYPE "EntityType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('CREATED', 'STATUS_CHANGE', 'ASSIGNMENT', 'STAKEHOLDER_ADDED', 'STAKEHOLDER_REMOVED', 'COMMENT_ADDED', 'DUE_DATE_CHANGED', 'PROCESS_INITIATED', 'INSTANCE_COMPLETED');
ALTER TABLE "events" ALTER COLUMN "event_type" TYPE "EventType_new" USING ("event_type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "EventType_old";
COMMIT;

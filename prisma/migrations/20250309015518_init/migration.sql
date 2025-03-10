-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('TASK', 'CONTROL', 'CONTROL_INSTANCE', 'PROCESS', 'PROCESS_INSTANCE', 'TEAM', 'USER');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('CREATED', 'STATUS_CHANGE', 'ASSIGNMENT', 'MEMBER_ADDED', 'MEMBER_REMOVED', 'COMMENT_ADDED', 'DUE_DATE_CHANGED', 'PRIORITY_CHANGED', 'LINKED', 'UNLINKED', 'PROCESS_INITIATED', 'INSTANCE_COMPLETED');

-- CreateEnum
CREATE TYPE "ChangeType" AS ENUM ('ADDED', 'REMOVED', 'MODIFIED', 'UNCHANGED');

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "entity_type" "EntityType" NOT NULL,
    "entity_id" TEXT NOT NULL,
    "event_type" "EventType" NOT NULL,
    "actor_id" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "session_id" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,
    "metadata" JSONB NOT NULL DEFAULT '{}',

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_details" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "change_type" "ChangeType",
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" TEXT NOT NULL,

    CONSTRAINT "event_details_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_entity_type_idx" ON "events"("entity_type");

-- CreateIndex
CREATE INDEX "events_entity_id_idx" ON "events"("entity_id");

-- CreateIndex
CREATE INDEX "events_event_type_idx" ON "events"("event_type");

-- CreateIndex
CREATE INDEX "events_actor_id_idx" ON "events"("actor_id");

-- CreateIndex
CREATE INDEX "events_timestamp_idx" ON "events"("timestamp");

-- CreateIndex
CREATE INDEX "events_created_at_idx" ON "events"("created_at");

-- CreateIndex
CREATE INDEX "events_entity_type_entity_id_idx" ON "events"("entity_type", "entity_id");

-- CreateIndex
CREATE INDEX "event_details_event_id_idx" ON "event_details"("event_id");

-- AddForeignKey
ALTER TABLE "event_details" ADD CONSTRAINT "event_details_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

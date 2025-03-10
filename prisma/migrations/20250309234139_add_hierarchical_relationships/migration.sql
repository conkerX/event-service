-- AlterTable
ALTER TABLE "events" ADD COLUMN     "parent_entity_id" TEXT,
ADD COLUMN     "parent_entity_type" "EntityType",
ADD COLUMN     "root_entity_id" TEXT,
ADD COLUMN     "root_entity_type" "EntityType";

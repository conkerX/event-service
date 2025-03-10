-- CreateIndex
CREATE INDEX "events_parent_entity_type_parent_entity_id_idx" ON "events"("parent_entity_type", "parent_entity_id");

-- CreateIndex
CREATE INDEX "events_root_entity_type_root_entity_id_idx" ON "events"("root_entity_type", "root_entity_id");

const mockInstanceCreated = {
  entityType: "PROCESS_INSTANCE",
  entityId: "instance-789",
  eventType: "CREATED",
  sourceId: "api-service",
  createdBy: "ZOR242",
  parentEntityType: "PROCESS",
  parentEntityId: "process-456",
  rootEntityType: "CONTROL",
  rootEntityId: "control-456",
  metadata: {
    scheduledStartDate: "2023-04-01",
    scheduledEndDate: "2023-06-30",
  },
  details: [
    {
      fieldName: "status",
      oldValue: null,
      newValue: "IN_PROGRESS",
      changeType: "ADDED",
    },
  ],
};

const mockInstanceCompleted = {
  entityType: "PROCESS_INSTANCE",
  entityId: "instance-789",
  eventType: "INSTANCE_COMPLETED",
  sourceId: "api-service",
  createdBy: "ZOR242",
  parentEntityType: "PROCESS",
  parentEntityId: "process-456",
  rootEntityType: "CONTROL",
  rootEntityId: "control-456",
  metadata: {
    instanceName: "Q2 2023 Controls Review",
    completionDate: "2023-06-28",
    notes: "All tasks reviewed and completed.",
  },
  details: [
    {
      fieldName: "status",
      oldValue: "IN_PROGRESS",
      newValue: "COMPLETED",
      changeType: "MODIFIED",
    },
  ],
};

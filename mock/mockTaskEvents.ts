const mockTaskCreated = {
  entityType: "TASK",
  entityId: "task-123",
  eventType: "CREATED",
  sourceId: "api-service",
  createdBy: "ZOR242",
  parentEntityType: "PROCESS_INSTANCE",
  parentEntityId: "instance-789",
  rootEntityType: "CONTROL",
  rootEntityId: "control-456",
  metadata: {
    taskName: "Review Q2 Controls Documentation",
    dueDate: "2023-07-15",
  },
  details: [
    {
      fieldName: "status",
      oldValue: null,
      newValue: "PENDING",
      changeType: "ADDED",
    },
    {
      fieldName: "assignedTo",
      oldValue: null,
      newValue: "user-789",
      changeType: "ADDED",
    },
  ],
};

const mockTaskReassigned = {
  entityType: "TASK",
  entityId: "task-123",
  eventType: "ASSIGNMENT",
  sourceId: "api-service",
  createdBy: "ZOR242",
  parentEntityType: "PROCESS_INSTANCE",
  parentEntityId: "instance-789",
  rootEntityType: "CONTROL",
  rootEntityId: "control-456",
  metadata: {
    taskName: "Review Q2 Controls Documentation",
    reason: "User requested reassignment due to workload",
  },
  details: [
    {
      fieldName: "assignedTo",
      oldValue: "user-789",
      newValue: "user-456",
      changeType: "MODIFIED",
    },
  ],
};

const mockTaskCompleted = {
  entityType: "TASK",
  entityId: "task-123",
  eventType: "STATUS_CHANGE",
  sourceId: "api-service",
  createdBy: "user-456",
  parentEntityType: "PROCESS_INSTANCE",
  parentEntityId: "instance-789",
  rootEntityType: "CONTROL",
  rootEntityId: "control-456",
  metadata: {
    taskName: "Review Q2 Controls Documentation",
    note: "Documentation reviewed and approved with minor comments",
  },
  details: [
    {
      fieldName: "status",
      oldValue: "PENDING",
      newValue: "COMPLETED",
      changeType: "MODIFIED",
    },
  ],
};

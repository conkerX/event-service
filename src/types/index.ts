import { EntityType, EventType, ChangeType } from "../enums";

// DTOs (Data Transfer Objects)
export interface EventDetailDto {
  fieldName: string;
  oldValue?: string | null;
  newValue?: string | null;
  changeType?: ChangeType | null;
}

export interface EventDto {
  entityType: EntityType;
  entityId: string;
  eventType: EventType;
  sourceId: string;
  createdBy: string;
  parentEntityType?: EntityType;
  parentEntityId?: string;
  rootEntityType?: EntityType;
  rootEntityId?: string;
  metadata?: Record<string, any>;
  details?: EventDetailDto[];
}

// Query interfaces
export interface EventQuery {
  entityType?: EntityType | EntityType[];
  entityId?: string | string[];
  eventType?: EventType | EventType[];
  createdBy?: string | string[];
  sourceId?: string;
  parentEntityType?: EntityType;
  parentEntityId?: string;
  rootEntityType?: EntityType;
  rootEntityId?: string;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
  includeDetails?: boolean;
  excludeEntityTypes?: EntityType | EntityType[];
}

export interface EventQueryResult {
  events: any[];
  count: number;
  limit: number;
  offset: number;
}

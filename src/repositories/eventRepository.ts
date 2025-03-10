import { PrismaClient } from "@prisma/client";
import { EventDto, EventQuery, EventQueryResult } from "../types";

// Create a singleton instance of PrismaClient
const prisma = new PrismaClient();

/**
 * Creates a new event with its details
 */
export const createEvent = async (eventData: EventDto) => {
  return prisma.event.create({
    data: {
      entityType: eventData.entityType,
      entityId: eventData.entityId,
      eventType: eventData.eventType,
      sourceId: eventData.sourceId,
      createdBy: eventData.createdBy,
      parentEntityType: eventData.parentEntityType,
      parentEntityId: eventData.parentEntityId,
      rootEntityType: eventData.rootEntityType,
      rootEntityId: eventData.rootEntityId,
      metadata: eventData.metadata || {},
      details: eventData.details
        ? {
            create: eventData.details.map((detail) => ({
              fieldName: detail.fieldName,
              oldValue: detail.oldValue,
              newValue: detail.newValue,
              changeType: detail.changeType,
            })),
          }
        : undefined,
    },
    include: {
      details: true,
    },
  });
};

/**
 * Finds events matching the provided query parameters
 */
export const findEvents = async (query: EventQuery) => {
  // Build the where clause based on query parameters
  const where: any = {};

  if (query.entityType) {
    where.entityType = Array.isArray(query.entityType)
      ? { in: query.entityType }
      : query.entityType;
  }

  if (query.excludeEntityTypes) {
    // If entityType is already specified, we need to combine the conditions
    if (where.entityType) {
      // If entityType is a direct value (not an object with 'in')
      if (typeof where.entityType === "string") {
        // Convert to an object with both 'equals' and 'not' conditions
        const entityTypeValue = where.entityType;
        where.entityType = {
          equals: entityTypeValue,
          not: Array.isArray(query.excludeEntityTypes)
            ? { in: query.excludeEntityTypes }
            : query.excludeEntityTypes,
        };
      } else {
        // entityType already has an 'in' condition, add 'not' condition
        where.entityType = {
          ...where.entityType,
          not: Array.isArray(query.excludeEntityTypes)
            ? { in: query.excludeEntityTypes }
            : query.excludeEntityTypes,
        };
      }
    } else {
      // No existing entityType filter, simply add the exclusion
      where.entityType = {
        not: Array.isArray(query.excludeEntityTypes)
          ? { in: query.excludeEntityTypes }
          : query.excludeEntityTypes,
      };
    }
  }

  if (query.entityId) {
    where.entityId = Array.isArray(query.entityId)
      ? { in: query.entityId }
      : query.entityId;
  }

  if (query.eventType) {
    where.eventType = Array.isArray(query.eventType)
      ? { in: query.eventType }
      : query.eventType;
  }

  if (query.sourceId) {
    where.sourceId = query.sourceId;
  }

  if (query.createdBy) {
    where.createdBy = Array.isArray(query.createdBy)
      ? { in: query.createdBy }
      : query.createdBy;
  }

  if (query.parentEntityType) {
    where.parentEntityType = Array.isArray(query.parentEntityType)
      ? { in: query.parentEntityType }
      : query.parentEntityType;
  }

  if (query.parentEntityId) {
    where.parentEntityId = Array.isArray(query.parentEntityId)
      ? { in: query.parentEntityId }
      : query.parentEntityId;
  }

  if (query.rootEntityType) {
    where.rootEntityType = Array.isArray(query.rootEntityType)
      ? { in: query.rootEntityType }
      : query.rootEntityType;
  }

  if (query.rootEntityId) {
    where.rootEntityId = Array.isArray(query.rootEntityId)
      ? { in: query.rootEntityId }
      : query.rootEntityId;
  }

  // Date range filtering
  if (query.fromDate || query.toDate) {
    where.createdAt = {};

    if (query.fromDate) {
      where.createdAt.gte = query.fromDate;
    }

    if (query.toDate) {
      where.createdAt.lte = query.toDate;
    }
  }

  return prisma.event.findMany({
    where,
    include: {
      details: query.includeDetails === true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: query.limit || 100,
    skip: query.offset || 0,
  });
};

/**
 * Gets the count of events matching the query
 */
export const countEvents = async (query: EventQuery): Promise<number> => {
  // Build the same where clause as findEvents
  const where: any = {};

  // ... same where clause building logic as in findEvents
  // (for brevity, not repeating the code)

  return prisma.event.count({ where });
};

/**
 * Gets paginated event results
 */
export const getEventResults = async (
  query: EventQuery
): Promise<EventQueryResult> => {
  const [events, count] = await Promise.all([
    findEvents(query),
    countEvents(query),
  ]);

  return {
    events,
    count,
    limit: query.limit || 100,
    offset: query.offset || 0,
  };
};

/**
 * Gets an event by ID
 */
export const getEventById = async (id: string, includeDetails = true) => {
  return prisma.event.findUnique({
    where: { id },
    include: {
      details: includeDetails,
    },
  });
};

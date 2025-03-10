import { Request, Response, NextFunction } from "express";
import { EventDto } from "../types";
import { EntityType, EventType, ChangeType } from "../enums";

export const validateEventData = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const eventData: EventDto = req.body;

  // Check required fields
  if (
    !eventData.entityType ||
    !Object.values(EntityType).includes(eventData.entityType)
  ) {
    res.status(400).json({ error: "Valid entityType is required" });
    return;
  }

  if (!eventData.entityId) {
    res.status(400).json({ error: "entityId is required" });
    return;
  }

  if (
    !eventData.eventType ||
    !Object.values(EventType).includes(eventData.eventType)
  ) {
    res.status(400).json({ error: "Valid eventType is required" });
    return;
  }

  if (!eventData.sourceId) {
    res.status(400).json({ error: "sourceId is required" });
    return;
  }

  if (!eventData.createdBy) {
    res.status(400).json({ error: "createdBy is required" });
    return;
  }

  if (
    eventData.parentEntityType &&
    !Object.values(EntityType).includes(eventData.parentEntityType)
  ) {
    res.status(400).json({ error: "Valid parentEntityType is required" });
    return;
  }

  if (eventData.parentEntityType && !eventData.parentEntityId) {
    res.status(400).json({
      error: "parentEntityId is required when parentEntityType is provided",
    });
    return;
  }

  if (
    eventData.rootEntityType &&
    !Object.values(EntityType).includes(eventData.rootEntityType)
  ) {
    res.status(400).json({ error: "Valid rootEntityType is required" });
    return;
  }

  if (eventData.rootEntityType && !eventData.rootEntityId) {
    res.status(400).json({
      error: "rootEntityId is required when rootEntityType is provided",
    });
    return;
  }

  // Validate metadata if provided
  if (eventData.metadata && typeof eventData.metadata !== "object") {
    res.status(400).json({ error: "metadata must be an object" });
    return;
  }

  // Validate event details if provided
  if (eventData.details) {
    if (!Array.isArray(eventData.details)) {
      res.status(400).json({ error: "details must be an array" });
      return;
    }

    for (let i = 0; i < eventData.details.length; i++) {
      const detail = eventData.details[i];

      if (!detail.fieldName) {
        res.status(400).json({ error: `details[${i}].fieldName is required` });
        return;
      }

      if (
        detail.changeType &&
        !Object.values(ChangeType).includes(detail.changeType)
      ) {
        res.status(400).json({ error: `details[${i}].changeType is invalid` });
        return;
      }
    }
  }

  // Validate excludeEntityTypes if provided
  if (req.query.excludeEntityTypes) {
    const excludeTypes = Array.isArray(req.query.excludeEntityTypes)
      ? req.query.excludeEntityTypes
      : [req.query.excludeEntityTypes];

    for (const type of excludeTypes) {
      if (!Object.values(EntityType).includes(type as EntityType)) {
        res.status(400).json({ error: `Invalid excludeEntityTypes: ${type}` });
        return;
      }
    }
  }

  next();
};

export const validateEventQuery = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Validate date parameters if provided
  if (req.query.fromDate) {
    const fromDate = new Date(req.query.fromDate as string);
    if (isNaN(fromDate.getTime())) {
      res.status(400).json({ error: "Invalid fromDate format" });
      return;
    }
  }

  if (req.query.toDate) {
    const toDate = new Date(req.query.toDate as string);
    if (isNaN(toDate.getTime())) {
      res.status(400).json({ error: "Invalid toDate format" });
      return;
    }
  }

  // Validate limit and offset if provided
  if (req.query.limit) {
    const limit = parseInt(req.query.limit as string, 10);
    if (isNaN(limit) || limit <= 0) {
      res.status(400).json({ error: "limit must be a positive number" });
      return;
    }
  }

  if (req.query.offset) {
    const offset = parseInt(req.query.offset as string, 10);
    if (isNaN(offset) || offset < 0) {
      res.status(400).json({ error: "offset must be a non-negative number" });
      return;
    }
  }

  // Validate entityType if provided
  if (req.query.entityType) {
    const entityTypes = Array.isArray(req.query.entityType)
      ? req.query.entityType
      : [req.query.entityType];

    for (const type of entityTypes) {
      if (!Object.values(EntityType).includes(type as EntityType)) {
        res.status(400).json({ error: `Invalid entityType: ${type}` });
        return;
      }
    }
  }

  // Validate eventType if provided
  if (req.query.eventType) {
    const eventTypes = Array.isArray(req.query.eventType)
      ? req.query.eventType
      : [req.query.eventType];

    for (const type of eventTypes) {
      if (!Object.values(EventType).includes(type as EventType)) {
        res.status(400).json({ error: `Invalid eventType: ${type}` });
        return;
      }
    }
  }

  next();
};

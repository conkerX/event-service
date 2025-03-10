import express, { Request, Response } from "express";
import * as eventService from "../services/eventService";
import { EntityType, EventType } from "../enums";
import {
  validateEventData,
  validateEventQuery,
} from "../middleware/validation";

const router = express.Router();

// Create a new event
router.post(
  "/events",
  validateEventData,
  async (req: Request, res: Response) => {
    try {
      const event = await eventService.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      console.error("Failed to create event:", error);
      res.status(500).json({ error: "Failed to create event" });
    }
  }
);

// Get events with filtering and pagination
router.get(
  "/events",
  validateEventQuery,
  async (req: Request, res: Response) => {
    try {
      // Parse query parameters
      const query = {
        entityType: req.query.entityType as EntityType | EntityType[],
        entityId: req.query.entityId as string | string[],
        eventType: req.query.eventType as EventType | EventType[],
        createdBy: req.query.createdBy as string | string[],
        sourceId: req.query.sourceId as string,
        fromDate: req.query.fromDate
          ? new Date(req.query.fromDate as string)
          : undefined,
        toDate: req.query.toDate
          ? new Date(req.query.toDate as string)
          : undefined,
        limit: req.query.limit ? parseInt(req.query.limit as string, 10) : 100,
        offset: req.query.offset ? parseInt(req.query.offset as string, 10) : 0,
        includeDetails: req.query.includeDetails === "true",
        excludeEntityTypes: req.query.excludeEntityTypes as
          | EntityType
          | EntityType[],
      };

      const result = await eventService.getEventResults(query);
      res.json(result);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      res.status(500).json({ error: "Failed to fetch events" });
    }
  }
);

// Get event by ID
router.get("/events/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const event = await eventService.getEventById(id);

    if (!event) {
      res.status(404).json({ error: "Event not found" });
    }

    res.json(event);
  } catch (error) {
    console.error("Failed to fetch event:", error);
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

export default router;

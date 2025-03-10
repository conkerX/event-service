import { EventDto, EventQuery, EventQueryResult } from "../types";
import * as eventRepository from "../repositories/eventRepository";

/**
 * Creates a new event
 */
export const createEvent = async (eventData: EventDto) => {
  // Here you can add business logic before persisting the event
  // For example, adding timestamps, validating business rules, etc.

  return eventRepository.createEvent(eventData);
};

/**
 * Creates multiple events in a batch
 */
export const createEvents = async (eventsData: EventDto[]) => {
  // Add any batch processing logic here
  const createdEvents = [];

  for (const eventData of eventsData) {
    const event = await createEvent(eventData);
    createdEvents.push(event);
  }

  return createdEvents;
};

/**
 * Gets an event by its ID
 */
export const getEventById = async (id: string, includeDetails = true) => {
  return eventRepository.getEventById(id, includeDetails);
};

/**
 * Gets events based on query parameters
 */
export const getEvents = async (query: EventQuery) => {
  return eventRepository.findEvents(query);
};

/**
 * Gets paginated events with count
 */
export const getEventResults = async (
  query: EventQuery
): Promise<EventQueryResult> => {
  return eventRepository.getEventResults(query);
};

import { Request, Response, NextFunction } from "express";
import EventService from "../services/event.service";

export class EventController {
  private service: EventService;

  constructor() {
    this.service = new EventService();
  }

  public create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const created = await this.service.createEvent(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  };

  public getAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const events = await this.service.getAllEvents();
      res.json(events);
    } catch (err) {
      next(err);
    }
  };

  public getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
  const id = String(req.params.id);
  const event = await this.service.getEventById(id);
      res.json(event);
    } catch (err) {
      next(err);
    }
  };

  public update = async (req: Request, res: Response, next: NextFunction) => {
    try {
  const id = String(req.params.id);
  const updated = await this.service.updateEvent(id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  public delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
  const id = String(req.params.id);
  await this.service.deleteEvent(id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  };

  public registerAttendee = async (req: Request, res: Response, next: NextFunction) => {
    try {
  const id = String(req.params.id);
  const updated = await this.service.registerAttendee(id, req.body);
      res.status(201).json(updated);
    } catch (err) {
      next(err);
    }
  };

  public removeAttendee = async (req: Request, res: Response, next: NextFunction) => {
    try {
  const id = String(req.params.id);
  const attendeeId = String(req.params.attendeeId);
  const updated = await this.service.removeAttendee(id, attendeeId);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  };

  public getAttendees = async (req: Request, res: Response, next: NextFunction) => {
    try {
  const id = String(req.params.id);
  const attendees = await this.service.getAttendees(id);
      res.json(attendees);
    } catch (err) {
      next(err);
    }
  };
}

export default EventController;

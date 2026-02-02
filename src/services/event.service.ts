import EventRepository from "../repositories/event.repository";
import { EventMongooseModel } from "../models/event.model";
import { AttendeeMongooseModel } from "../models/attendee.model";
import EventStatus from "../enums/eventStatus";
import CustomError from "../errors/custom.error";

export class EventService {
  private repo: EventRepository;

  constructor() {
    this.repo = new EventRepository();
  }

  public async createEvent(payload: any) {
    return this.repo.create(payload);
  }

  public async getAllEvents() {
    return this.repo.findAll();
  }

  public async getEventById(id: string) {
    const ev = await this.repo.findById(id);
    if (!ev) throw new CustomError("Event not found", 404);
    return ev;
  }

  public async updateEvent(id: string, payload: any) {
    const updated = await this.repo.update(id, payload);
    if (!updated) throw new CustomError("Event not found", 404);
    return updated;
  }

  public async deleteEvent(id: string) {
    const deleted = await this.repo.delete(id);
    if (!deleted) throw new CustomError("Event not found", 404);
    return deleted;
  }

  public async registerAttendee(eventId: string, attendeePayload: any) {
    const event = await this.repo.findById(eventId);
    if (!event) throw new CustomError("Event not found", 404);

    // Prevent duplicate attendee by email
    const exists = event.attendees.find((a: any) => a.email === attendeePayload.email);
    if (exists) throw new CustomError("Attendee already registered", 400);

    // Prevent overbooking
    if (event.attendees.length >= event.maxAttendees) throw new CustomError("Event is full", 400);

    // create attendee subdoc
    const attendee = (await AttendeeMongooseModel.create(attendeePayload)) as any;
    event.attendees.push(attendee);
    await event.save();
    return event;
  }

  public async removeAttendee(eventId: string, attendeeId: string) {
    const event = await this.repo.findById(eventId);
    if (!event) throw new CustomError("Event not found", 404);

    const found = event.attendees.find((a: any) => a._id?.toString() === attendeeId);
    if (!found) throw new CustomError("Attendee not found", 404);

    event.attendees = event.attendees.filter((a: any) => a._id?.toString() !== attendeeId) as any;
    await event.save();
    return event;
  }

  public async getAttendees(eventId: string) {
    const attendees = await this.repo.getAttendees(eventId);
    if (attendees === null) throw new CustomError("Event not found", 404);
    return attendees;
  }
}

export default EventService;

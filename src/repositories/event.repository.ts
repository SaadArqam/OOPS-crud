import { EventMongooseModel, IEvent } from "../models/event.model";
import { AttendeeMongooseModel, IAttendee } from "../models/attendee.model";
import { Types } from "mongoose";

export class EventRepository {
  public async create(data: Partial<IEvent>): Promise<IEvent> {
    const event = new EventMongooseModel(data);
    return event.save();
  }

  public async findAll(): Promise<IEvent[]> {
    return EventMongooseModel.find().exec();
  }

  public async findById(id: string) {
    return EventMongooseModel.findById(id).exec();
  }

  public async update(id: string, data: Partial<IEvent>) {
    return EventMongooseModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  public async delete(id: string) {
    return EventMongooseModel.findByIdAndDelete(id).exec();
  }

  public async addAttendee(eventId: string, attendee: Partial<IAttendee>) {
    const doc = await EventMongooseModel.findById(eventId);
    if (!doc) return null;
    doc.attendees.push(attendee as any);
    await doc.save();
    return doc;
  }

  public async removeAttendee(eventId: string, attendeeId: string) {
    const doc = await EventMongooseModel.findById(eventId);
    if (!doc) return null;
    doc.attendees = doc.attendees.filter((a: any) => a._id?.toString() !== attendeeId) as any;
    await doc.save();
    return doc;
  }

  public async getAttendees(eventId: string) {
    const doc = await EventMongooseModel.findById(eventId).exec();
    return doc ? doc.attendees : null;
  }
}

export default EventRepository;

import { Schema, model, Document, Types } from "mongoose";
import EventStatus from "../enums/eventStatus";
import { IAttendee, AttendeeMongooseModel } from "./attendee.model";

export interface IEvent extends Document {
  title: string;
  description?: string;
  date: Date;
  location?: string;
  maxAttendees: number;
  status: EventStatus;
  attendees: Types.DocumentArray<IAttendee>;
}

const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  location: { type: String },
  maxAttendees: { type: Number, required: true, min: 0 },
  status: { type: String, enum: Object.values(EventStatus), default: EventStatus.UPCOMING },
  attendees: { type: [AttendeeMongooseModel.schema], default: [] },
});

export const EventMongooseModel = model<IEvent>("Event", EventSchema);

export class EventEntity {
  private _id?: string;
  private _title: string;
  private _description?: string;
  private _date: Date;
  private _location?: string;
  private _maxAttendees: number;
  private _status: EventStatus;

  constructor(
    title: string,
    date: Date,
    maxAttendees: number,
    status: EventStatus = EventStatus.UPCOMING,
    description?: string,
    location?: string,
    id?: string
  ) {
    this._title = title;
    this._date = date;
    this._maxAttendees = maxAttendees;
    this._status = status;
    this._description = description;
    this._location = location;
    if (id) this._id = id;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get title(): string {
    return this._title;
  }

  public get description(): string | undefined {
    return this._description;
  }

  public get date(): Date {
    return this._date;
  }

  public get location(): string | undefined {
    return this._location;
  }

  public get maxAttendees(): number {
    return this._maxAttendees;
  }

  public get status(): EventStatus {
    return this._status;
  }
}

export default EventEntity;

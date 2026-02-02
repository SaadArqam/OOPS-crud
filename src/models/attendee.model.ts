import { Schema, model, Document } from "mongoose";

export interface IAttendee extends Document {
  name: string;
  email: string;
}

const AttendeeSchema = new Schema<IAttendee>({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

export const AttendeeMongooseModel = model<IAttendee>("Attendee", AttendeeSchema);

export class Attendee {
  private _id?: string;
  private _name: string;
  private _email: string;

  constructor(name: string, email: string, id?: string) {
    this._name = name;
    this._email = email;
    if (id) this._id = id;
  }

  public get id(): string | undefined {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }
}

export default Attendee;

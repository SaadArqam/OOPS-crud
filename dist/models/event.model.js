"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventEntity = exports.EventMongooseModel = void 0;
const mongoose_1 = require("mongoose");
const eventStatus_1 = __importDefault(require("../enums/eventStatus"));
const attendee_model_1 = require("./attendee.model");
const EventSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    maxAttendees: { type: Number, required: true, min: 0 },
    status: { type: String, enum: Object.values(eventStatus_1.default), default: eventStatus_1.default.UPCOMING },
    attendees: { type: [attendee_model_1.AttendeeMongooseModel.schema], default: [] },
});
exports.EventMongooseModel = (0, mongoose_1.model)("Event", EventSchema);
class EventEntity {
    constructor(title, date, maxAttendees, status = eventStatus_1.default.UPCOMING, description, location, id) {
        this._title = title;
        this._date = date;
        this._maxAttendees = maxAttendees;
        this._status = status;
        this._description = description;
        this._location = location;
        if (id)
            this._id = id;
    }
    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get description() {
        return this._description;
    }
    get date() {
        return this._date;
    }
    get location() {
        return this._location;
    }
    get maxAttendees() {
        return this._maxAttendees;
    }
    get status() {
        return this._status;
    }
}
exports.EventEntity = EventEntity;
exports.default = EventEntity;

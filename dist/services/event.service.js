"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const event_repository_1 = __importDefault(require("../repositories/event.repository"));
const attendee_model_1 = require("../models/attendee.model");
const custom_error_1 = __importDefault(require("../errors/custom.error"));
class EventService {
    constructor() {
        this.repo = new event_repository_1.default();
    }
    async createEvent(payload) {
        return this.repo.create(payload);
    }
    async getAllEvents() {
        return this.repo.findAll();
    }
    async getEventById(id) {
        const ev = await this.repo.findById(id);
        if (!ev)
            throw new custom_error_1.default("Event not found", 404);
        return ev;
    }
    async updateEvent(id, payload) {
        const updated = await this.repo.update(id, payload);
        if (!updated)
            throw new custom_error_1.default("Event not found", 404);
        return updated;
    }
    async deleteEvent(id) {
        const deleted = await this.repo.delete(id);
        if (!deleted)
            throw new custom_error_1.default("Event not found", 404);
        return deleted;
    }
    async registerAttendee(eventId, attendeePayload) {
        const event = await this.repo.findById(eventId);
        if (!event)
            throw new custom_error_1.default("Event not found", 404);
        // Prevent duplicate attendee by email
        const exists = event.attendees.find((a) => a.email === attendeePayload.email);
        if (exists)
            throw new custom_error_1.default("Attendee already registered", 400);
        // Prevent overbooking
        if (event.attendees.length >= event.maxAttendees)
            throw new custom_error_1.default("Event is full", 400);
        // create attendee subdoc
        const attendee = (await attendee_model_1.AttendeeMongooseModel.create(attendeePayload));
        event.attendees.push(attendee);
        await event.save();
        return event;
    }
    async removeAttendee(eventId, attendeeId) {
        const event = await this.repo.findById(eventId);
        if (!event)
            throw new custom_error_1.default("Event not found", 404);
        const found = event.attendees.find((a) => a._id?.toString() === attendeeId);
        if (!found)
            throw new custom_error_1.default("Attendee not found", 404);
        event.attendees = event.attendees.filter((a) => a._id?.toString() !== attendeeId);
        await event.save();
        return event;
    }
    async getAttendees(eventId) {
        const attendees = await this.repo.getAttendees(eventId);
        if (attendees === null)
            throw new custom_error_1.default("Event not found", 404);
        return attendees;
    }
}
exports.EventService = EventService;
exports.default = EventService;

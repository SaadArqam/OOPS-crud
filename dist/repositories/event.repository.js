"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const event_model_1 = require("../models/event.model");
class EventRepository {
    async create(data) {
        const event = new event_model_1.EventMongooseModel(data);
        return event.save();
    }
    async findAll() {
        return event_model_1.EventMongooseModel.find().exec();
    }
    async findById(id) {
        return event_model_1.EventMongooseModel.findById(id).exec();
    }
    async update(id, data) {
        return event_model_1.EventMongooseModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    async delete(id) {
        return event_model_1.EventMongooseModel.findByIdAndDelete(id).exec();
    }
    async addAttendee(eventId, attendee) {
        const doc = await event_model_1.EventMongooseModel.findById(eventId);
        if (!doc)
            return null;
        doc.attendees.push(attendee);
        await doc.save();
        return doc;
    }
    async removeAttendee(eventId, attendeeId) {
        const doc = await event_model_1.EventMongooseModel.findById(eventId);
        if (!doc)
            return null;
        doc.attendees = doc.attendees.filter((a) => a._id?.toString() !== attendeeId);
        await doc.save();
        return doc;
    }
    async getAttendees(eventId) {
        const doc = await event_model_1.EventMongooseModel.findById(eventId).exec();
        return doc ? doc.attendees : null;
    }
}
exports.EventRepository = EventRepository;
exports.default = EventRepository;

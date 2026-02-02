"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventController = void 0;
const event_service_1 = __importDefault(require("../services/event.service"));
class EventController {
    constructor() {
        this.create = async (req, res, next) => {
            try {
                const created = await this.service.createEvent(req.body);
                res.status(201).json(created);
            }
            catch (err) {
                next(err);
            }
        };
        this.getAll = async (_req, res, next) => {
            try {
                const events = await this.service.getAllEvents();
                res.json(events);
            }
            catch (err) {
                next(err);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const id = String(req.params.id);
                const event = await this.service.getEventById(id);
                res.json(event);
            }
            catch (err) {
                next(err);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const id = String(req.params.id);
                const updated = await this.service.updateEvent(id, req.body);
                res.json(updated);
            }
            catch (err) {
                next(err);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const id = String(req.params.id);
                await this.service.deleteEvent(id);
                res.status(204).send();
            }
            catch (err) {
                next(err);
            }
        };
        this.registerAttendee = async (req, res, next) => {
            try {
                const id = String(req.params.id);
                const updated = await this.service.registerAttendee(id, req.body);
                res.status(201).json(updated);
            }
            catch (err) {
                next(err);
            }
        };
        this.removeAttendee = async (req, res, next) => {
            try {
                const id = String(req.params.id);
                const attendeeId = String(req.params.attendeeId);
                const updated = await this.service.removeAttendee(id, attendeeId);
                res.json(updated);
            }
            catch (err) {
                next(err);
            }
        };
        this.getAttendees = async (req, res, next) => {
            try {
                const id = String(req.params.id);
                const attendees = await this.service.getAttendees(id);
                res.json(attendees);
            }
            catch (err) {
                next(err);
            }
        };
        this.service = new event_service_1.default();
    }
}
exports.EventController = EventController;
exports.default = EventController;

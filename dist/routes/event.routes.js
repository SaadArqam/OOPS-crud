"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRouter = void 0;
const express_1 = require("express");
const event_controller_1 = __importDefault(require("../controllers/event.controller"));
const router = (0, express_1.Router)();
const controller = new event_controller_1.default();
// Event CRUD
router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
// Attendees
router.post("/:id/attendees", controller.registerAttendee);
router.get("/:id/attendees", controller.getAttendees);
router.delete("/:id/attendees/:attendeeId", controller.removeAttendee);
exports.eventRouter = router;

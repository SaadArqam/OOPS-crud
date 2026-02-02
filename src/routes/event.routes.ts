import { Router } from "express";
import EventController from "../controllers/event.controller";

const router = Router();
const controller = new EventController();

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

export const eventRouter = router;

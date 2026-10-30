import { Router } from "express";
import {
  createEvent,
  getAllEvent,
  getByOneEvent,
  myEvents,
} from "../../controllers/event.controller";
import { authMiddleware } from "../../controllers/auth.controller";
import { handleValidationErrors } from "../validate";

eventRouter = Router();

eventRouter.post(
  "/events",
  createEvent,
  authMiddleware,
  handleValidationErrors,
);
eventRouter.get("/events", getAllEvent, handleValidationErrors, authMiddleware);
eventRouter.get("/events/my", myEvents, handleValidationErrors, authMiddleware);
eventRouter.get("/events/:id", getByOneEvent);

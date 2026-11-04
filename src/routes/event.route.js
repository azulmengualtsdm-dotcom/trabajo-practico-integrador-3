import { Router } from "express";
import {
  createEvent,
  deleteEvent,
  getAllEvent,
  getByOneEvent,
  myEvents,
  updateEvent,
} from "../controllers/event.controller.js";
import {
  adminMiddleware,
  authMiddleware,
  ownerOrAdminMiddleware,
} from "../middlewares/validations/auth.validate.js";
import { handleValidationErrors } from "../middlewares/validate.js";

export const eventRouter = Router();
// ● POST /api/events → Crear un evento con sus categorías; el organizador es el usuario
// autenticado. (usuario autenticado)

eventRouter.post(
  "/events",
  createEvent,
  authMiddleware,
  handleValidationErrors,
);

// ● GET /api/events → Listar los eventos con populate de organizer y categories. (usuario
// autenticado)

eventRouter.get("/events", getAllEvent, authMiddleware);

// ● GET /api/events/my → Listar los eventos del usuario logueado. (usuario autenticado)

eventRouter.get("/events/my", myEvents, authMiddleware);

// ● GET /api/events/:id → Obtener un evento con populate de organizer y categories.
// (usuario autenticado)

eventRouter.get(
  "/events/:id",
  getByOneEvent,
  authMiddleware,
  handleValidationErrors,
);

// ● PUT /api/events/:id → Actualizar un evento y sus categorías. (solo organizador o
// admin)

eventRouter.put(
  "/events/:id",
  updateEvent,
  ownerOrAdminMiddleware,
  handleValidationErrors,
);
// ● DELETE /api/events/:id → Eliminación física de un evento. (solo organizador o
// admin)

eventRouter.delete(
  "/events/:id",
  deleteEvent,
  ownerOrAdminMiddleware,
  handleValidationErrors,
);

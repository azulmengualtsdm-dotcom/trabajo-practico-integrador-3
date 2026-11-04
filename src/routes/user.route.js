import { Router } from "express";
import { handleValidationErrors } from "../middlewares/validate.js";
import { adminMiddleware } from "../controllers/auth.controller.js";
import { myEvents } from "../controllers/event.controller.js";
import {
  deleteUser,
  getAllUser,
  updateUser,
} from "../controllers/user.controller";

export const userRouter = Router();

userRouter.get("/users", handleValidationErrors, adminMiddleware, getAllUser);
userRouter.get("/users/:id", myEvents, handleValidationErrors, adminMiddleware);
userRouter.put(
  "/users/:id",
  updateUser,
  adminMiddleware,
  handleValidationErrors,
);
userRouter.delete(
  "/users/:id",
  handleValidationErrors,
  deleteUser,
  adminMiddleware,
);

import { Router } from "express";
import { handleValidationErrors } from "../middlewares/validate";
import { adminMiddleware } from "../controllers/auth.controller";
import { myEvents } from "../controllers/event.controller";
import {
  deleteUser,
  getAllUser,
  updateUser,
} from "../controllers/user.controller";

userRouter = Router();

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

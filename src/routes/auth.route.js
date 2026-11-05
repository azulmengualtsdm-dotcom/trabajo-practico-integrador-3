import { Router } from "express";
import {
  authMiddleware,
  validateLogin,
  validateProfileUpdate,
  validateRegister,
} from "../middlewares/validations/auth.validate.js";
import { handleValidationErrors } from "../middlewares/validate.js";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller.js";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  register,
);
authRouter.post("/login", validateLogin, handleValidationErrors, login);
authRouter.post("/logout", logout, authMiddleware);
authRouter.get("/profile", getProfile, authMiddleware);
authRouter.put(
  "/profile",
  updateProfile,
  authMiddleware,
  handleValidationErrors,
  validateProfileUpdate,
);

import { Router } from "express";
import {
  authMiddleware,
  validateLogin,
  validateRegister,
} from "../middlewares/validations/auth.validate";
import { handleValidationErrors } from "../middlewares/validate";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/auth.controller";

const authRouter = Router();

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
);

import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getByidCategory,
  updateCategory,
} from "../controllers/category.controller.js";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/validations/auth.validate.js";
import { handleValidationErrors } from "../middlewares/validate.js";

export const categoryRouter = Router();

categoryRouter.post(
  "/categories",
  createCategory,
  adminMiddleware,
  handleValidationErrors,
);
categoryRouter.get("/categories", getAllCategories, authMiddleware);
categoryRouter.get("/categories/:id", getByidCategory, authMiddleware);
categoryRouter.put("/categories/:id", updateCategory, adminMiddleware);
categoryRouter.delete("/categories/:id", deleteCategory, adminMiddleware);

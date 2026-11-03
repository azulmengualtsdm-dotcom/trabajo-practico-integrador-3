import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getByidCategory,
  updateCategory,
} from "../controllers/category.controller";
import {
  adminMiddleware,
  authMiddleware,
} from "../middlewares/validations/auth.validate";
import { handleValidationErrors } from "../middlewares/validate";

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

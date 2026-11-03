import { body } from "express-validator";
import { param } from "express-validator";
import { model } from "mongoose";

export const validateEventId = [
  param("id").isMongoId().withMessage("el id no es uno valido de mongo"),
];

export const validateCreateEvent = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("el titulo es obligatorio")
    .isLength({ min: 3, max: 150 })
    .withMessage("el titulo debe tener entre 3 y 150 caracteres"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("la descripcion  es obligatoria")
    .isLength({ min: 20 })
    .withMessage("la descripcion debe tener al menos 20 caracteres"),
  body("startDate")
    .notEmpty()
    .withMessage("la fecha de inicio es obligatoria")
    .isISO8601()
    .withMessage("debe ingresar una fecha de inicio valida"),
  body("endDate")
    .notEmpty()
    .withMessage("la fecha de finalizacion es obligatoria")
    .isISO8601()
    .withMessage("debe ingresar una fecha valida")
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error(
          "la fecha de finalizacion debe estar posterior a la fecha de inicio",
        );
        return true;
      }
    }),
  body("capacity")
    .notEmpty()
    .withMessage("la capacidad es obligatoria")
    .isInt({ min: 1 })
    .withMessage("la capacidad debe ser un numero entero mayor o igual a 1"),

  body("price")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("el precio debe ser un numero mayor o igual a 0"),

  body("status")
    .optional()
    .isIn(["scheduled", "cancelled", "finished"])
    .withMessage("el estado no es valido"),

  body("location").notEmpty().withMessage("location es obligatorio"),
  body("location.venue")
    .trim()
    .notEmpty()
    .withMessage("el venue es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("debe tener entre 3 y 100 caracteres"),

  body("location.address")
    .trim()
    .notEmpty()
    .withMessage("la direccion es obligatoria")
    .isLength({ min: 5, max: 150 })
    .withMessage("debe tener entre 5 y 150 caracteres"),
  body("location.city")
    .trim()
    .notEmpty()
    .withMessage("la ciudad es obligatoria")
    .isLength({ min: 2, max: 50 })
    .withMessage("debe tener entre 2 y 50 caracteres"),
  body("categories")
    .optional()
    .isArray()
    .withMessage("categories debe ser un arreglo de ids")
    .custom(async (categoriesArray) => {
      if (!categoriesArray || categoriesArray.length === 0) return true;
      const Category = model("Category");
      for (const id of categoriesArray) {
        const mongoose = await import("mongoose");
        if (!mongoose.default.Types.ObjectId.isValid(id)) {
          throw new Error(
            `el id de categoría '${id}' no tiene un formato valido`,
          );
        }
        const exists = await Category.findById(id);
        if (!exists) {
          throw new Error(
            `la categoria con id '${id}' no existe en la base de datos`,
          );
        }
      }
      return true;
    }),
];

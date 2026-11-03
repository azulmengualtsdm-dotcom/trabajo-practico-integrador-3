import { body, param } from "express-validator";

export const validateCategoryId = [
  param("id")
    .isMongoId()
    .withMessage("el id de la categoria provisto no es valido"),
];

export const validateCategory = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("el nombre de la categoria es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("el nombre debe tener entre 2 y 30 caracteres"),

  body("description")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 })
    .withMessage("la descripcion no puede superar los 200 caracteres"),
];

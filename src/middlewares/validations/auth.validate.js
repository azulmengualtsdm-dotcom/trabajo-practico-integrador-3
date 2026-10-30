// ● username: 3-20 caracteres, alfanumérico, único.
// ● email: formato válido, único.
// ● password: mínimo 8 caracteres, con al menos una mayúscula, una minúscula y un
// número.
// ● role: solo valores permitidos ('user', 'admin').
import { ExpressValidator } from "express-validator";

export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio")
    .isAlphanumeric()
    .withMessage("no corresponden esas caracteristicas")
    .isLength({ min: 3, max: 20 })
    .withMessage("el username debe contener entre 3 y 20  caracteres"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("el email es obligatorio")
    .isEmail()
    .withMessage("debe ingresar un formato de email valido"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("la contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("debe tener 8 caracteres como minimo")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
    .withMessage(
      "La contraseña debe incluir al menos una mayúscula, una minúscula y un número",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("el rol solamente puede ser user o admin"),

  //     Profile (embebido):
  // ● firstName y lastName: 2-50 caracteres, solo letras.
  // ● birthDate: fecha válida, no futura (opcional).
  // ● phone: solo números, entre 8 y 15 dígitos (opcional).
  body("profile").notEmpty().withMessage("el objeto de perfil es obligatorio"),
  body("profile.firstName")
    .trim()
    .notEmpty()
    .withMessage("no debe estar vacio este campo")
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-zÁéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo debe contener letras"),
  body("profile.lastName")
    .trim()
    .notEmpty()
    .withMessage("no debe estar vacio este campo")
    .isLength({ min: 2, max: 50 })
    .matches(/^[A-Za-zÁéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo debe contener letras"),
  body("profile.birthDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Debe ingresar una fecha de nacimiento válida")
    .custom((value) => {
      if (new Date(value) > new Date()) {
        throw new Error("La fecha de nacimiento no puede ser una fecha futura");
      }
      return true;
    }),
  body("profile.phone")
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage("el telefono solo debe tener numero")
    .isLength({ min: 8, max: 15 })
    .withMessage("el telefono debe tener como minimo 8 caracteres y maximo 15"),
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail(),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
];

export const validateProfileUpdate = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .matches(/^[A-Za-zÁéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo debe contener letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("El apellido es obligatorio")
    .matches(/^[A-Za-zÁéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo debe contener letras")
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres"),

  body("birthDate")
    .optional({ checkFalsy: true })
    .isISO8601()
    .withMessage("Fecha de nacimiento inválida")
    .custom((value) => {
      if (new Date(value) > new Date())
        throw new Error("La fecha no puede ser futura");
      return true;
    }),

  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .isNumeric()
    .withMessage("El teléfono solo admite números")
    .isLength({ min: 8, max: 15 })
    .withMessage("El teléfono debe tener entre 8 y 15 dígitos"),
];

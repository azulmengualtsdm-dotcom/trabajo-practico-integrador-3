import { verifyToken } from "../helpers/jwt.helper.js";
import { UserModel } from "../models/UserModel.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ msg: "no autorizado" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ msg: "token inválido o expirado" });
    }
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ msg: "el usuario no existe" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor de autenticación" });
  }
};

export const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res
      .status(403)
      .json({
        msg: "acceso denegado. Se requieren permisos de administrador.",
      });
  }
  next();
};

import { model } from "mongoose";

export const ownerOrAdminMiddleware = async (req, res, next) => {
  try {
    const { id: eventId } = req.params;
    const authenticatedUser = req.user;

    if (authenticatedUser.role === "admin") {
      return next();
    }

    const event = await model("Event").findById(eventId);
    if (!event) {
      return res.status(404).json({ msg: "evento no encontrado." });
    }

    if (event.organizer.toString() !== authenticatedUser._id.toString()) {
      return res
        .status(403)
        .json({ msg: "acceso denegado. No sos el organizador de este evento" });
    }

    next();
  } catch (error) {
    res.status(500).json({ msg: "Error al validar" });
  }
};

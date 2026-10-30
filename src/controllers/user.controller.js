// ● GET /api/users → Listar los usuarios activos con el virtual populate events. (solo
// admin)

// ● DELETE /api/users/:id → Eliminación lógica del usuario con eliminación en cascada de
// sus eventos. (solo admin)

import { matchedData } from "express-validator";
import { UserModel } from "../models/usermode.js";

export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find().populate("event");

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "no se pudo traer a todos los usuarios" });
  }
};
// ● GET /api/users/:id → Obtener un usuario activo con sus eventos. (solo admin)
export const getByIdUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const user = await UserModel.findById(id).populate("event");

    if (!user) {
      return res.status(404).json({ msg: "no se encontro al usuario" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ msg: "Error, no se pudo obtener al usuario" });
  }
};

// ● PUT /api/users/:id → Actualizar un usuario. (solo admin)

export const updateUser = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const update = await UserModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      data,
      { new: true },
    );
    if (!update) {
      return res.status(404).json({
        msg: "no se encontro al usuario",
      });
    }
    res.status(200).json(update);
  } catch (error) {
    res.status(500).json({ msg: "Error, no se pudo editar al usuario" });
  }
};

// ● DELETE /api/users/:id → Eliminación lógica del usuario con eliminación en cascada de
// sus eventos. (solo admin)

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const deleteOne = await UserModel.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() },
      { new: true },
    );

    if (!deleteOne) {
      res.status(404).json({ msg: "no se encontro al usuario" });
    }
    res.status(200).json({ data: deleteOne });
  } catch (error) {
    res.status(500).json({ msg: "Error, no se pudo eliminar al usuario" });
  }
};

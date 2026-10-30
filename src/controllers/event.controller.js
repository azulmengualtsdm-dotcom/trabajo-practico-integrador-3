// ● POST /api/events → Crear un evento con sus categorías; el organizador es el usuario
// autenticado. (usuario autenticado)

import { matchedData } from "express-validator";
import { EventModel } from "../models/event.model.js";

export const createEvent = async (req, res) => {
  try {
    const limData = matchedData(req);
    const event = await EventModel.create(limData);
    res.status(201).json({ data: event });
  } catch (error) {
    res.status(500).json({ msg: "Error, no se pudo crear el evento" });
  }
};

// ● GET /api/events → Listar los eventos con populate de organizer y categories. (usuario
// autenticado)
export const getAllEvent = async (req, res) => {
  try {
    const events = await EventModel.find()
      .populate("categories")
      .populate("organizer");
    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ msg: "Error, no se puede traer los eventos" });
  }
};

// ● GET /api/events/my → Listar los eventos del usuario logueado. (usuario autenticado)

export const myEvents = async (req, res) => {
  try {
    const myEvent = await EventModel.find({ organizer: req.user._id });

    if (!myEvent) {
      return res.status(404).json({ msg: "no existe el evento" });
    }
    res.status(200).json({ data: myEvent });
  } catch (error) {
    res.status(500).json({ msg: "Error, no se pudo encontrar el evento" });
  }
};

// ● GET /api/events/:id → Obtener un evento con populate de organizer y categories.
// (usuario autenticado)
export const getByOneEvent = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const event = await EventModel.findById(id)
      .populate("categories")
      .populate("organizer");
    if (!event) {
      return res.status(404).json({ msg: "no existe el evento" });
    }
    res.status(200).json({ data: event });
  } catch (error) {
    res.status(500).json({ msg: "Error, algo salio mal con el servidor" });
  }
};

// ● PUT /api/events/:id → Actualizar un evento y sus categorías. (solo organizador o
// admin)
export const updateEvent = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const update = await EventModel.findOneAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("categories");

    if (!update) {
      return res.status(404).json({ msg: "no existe el evento" });
    }
    res.status(200).json({ data: update });
  } catch (error) {
    res.status(500).json({ msg: "Error, algo salio mal con el servidor" });
  }
};

// ● DELETE /api/events/:id → Eliminación física de un evento. (solo organizador o
// admin)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const deleteOne = await EventModel.findOneAndDelete(id);
    if (!deleteOne) {
      return res.status(404).json({ msg: "no se encontro el evento" });
    }
    res.status(200).json({ data: deleteOne, msg: "se borro correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "Error, algo salio mal con el servidor" });
  }
};

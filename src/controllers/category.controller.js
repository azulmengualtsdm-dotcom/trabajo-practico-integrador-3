import { matchedData } from "express-validator";
import { CategoryModel } from "../models/category.model.js";

// ● POST /api/categories → Crear una categoría. (solo admin)
export const createCategori = async (req, res) => {
  try {
    const limData = matchedData(req);
    const newcategory = await CategoryModel.create(limData);
    res.status(201).json({ data: newcategory });
  } catch (error) {
    res.status(500).json({ msg: "no se pudo crear el usuario" });
  }
};

// ● GET /api/categories → Listar las categorías. (usuario autenticado)
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();

    res.status(200).json({ data: categories });
  } catch (error) {
    res.status(500).json({ msg: "no se encontro a las categorias" });
  }
};

// ● GET /api/categories/:id → Obtener una categoría con el virtual populate events.
// (usuario autenticado)

export const getByidCategory = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const getcategory = await CategoryModel.findById(id).populate("events");
    if (!getcategory) {
      return res.status(404).json({ msg: "no existe la categoria" });
    }
    res.status(200).json({ data: getcategory });
  } catch (error) {
    res.status(500).json({ msg: "Error, algo salio mal con el servidor" });
  }
};

// ● PUT /api/categories/:id → Actualizar una categoría. (solo admin)
export const updateCategory = async (req, res) => {
  try {
    const { id, ...data } = matchedData(req);
    const update = await CategoryModel.findOneAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!update) {
      return res.status(404).json({ msg: "no existe la categoria" });
    }

    res.status(200).json({ data: update });
  } catch (error) {
    res.status(500).json({ msg: "Error, hay un error en el servidor" });
  }
};

// ● DELETE /api/categories/:id → Eliminar una categoría con eliminación en cascada.
// (solo admin)

export const deleteCategory = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const deleteOne = await CategoryModel.findOneAndDelete(id);
    if (!deleteOne) {
      return res.status(404).json({ msg: "no existe la categoria" });
    }
    res.status(200).json({ data: deleteOne });
  } catch (error) {
    res.status(500).json({ msg: "Error, no se pudo eliminar" });
  }
};

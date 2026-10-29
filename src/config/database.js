import mongoose from "mongoose";

export const startDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/integrador-mongoose");
    console.log("conectado exitosamente a la base de datos");
  } catch (error) {
    console.log("no se pudo conectar a la base de datos");
  }
};

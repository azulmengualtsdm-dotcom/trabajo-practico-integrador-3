import { UserModel } from "../models/usermode.js";

import { matchedData } from "express-validator";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helpers.js";
import { generateToken } from "../helpers/jwt.helpers.js";

export const register = async (req, res) => {
  try {
    const data = matchedData(req);
    const existingUser = await UserModel.findOne({
      $or: [{ email: data.email }, { username: data.username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "el username o el email ya se encuentran registrados" });
    }

    data.password = await hashPassword(data.password);
    const newUser = await UserModel.create({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role || "user",
      profile: {
        firstName: data["profile.firstName"] || data.profile?.firstName,
        lastName: data["profile.lastName"] || data.profile?.lastName,
        birthDate: data["profile.birthDate"] || data.profile?.birthDate || null,
        phone: data["profile.phone"] || data.profile?.phone || "",
      },
    });

    res.status(201).json({ data: newUser });
  } catch (error) {
    console.error("EL ERROR REAL ES ESTE 👉", error);
    res
      .status(500)
      .json({ msg: "Error al registrar el usuario en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const camposValidados = matchedData(req);
    const { email, password } = camposValidados;

    const user = await UserModel.findOne({ email });
    console.log(
      "LOGIN DIAGNÓSTICO -> Buscando email:",
      email,
      "| ¿Encontrado?:",
      user ? "SÍ" : "NO",
    );
    if (!user) {
      return res.status(400).json({ msg: "credenciales invalidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "contraseña incorrecta" });
    }

    const token = generateToken({ id: user._id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    user.password = undefined;
    res.status(200).json({ data: user, msg: "login exitoso" });
  } catch (error) {
    console.error("❌ ERROR CRÍTICO AL REGISTRAR:", error);
    res.status(500).json({ msg: "error al intentar iniciar sesion" });
  }
};

// export const login = async (req, res) => {
//   try {
//     const { email, password } = matchedData(req);
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: "credenciales invalidas" });
//     }

//     const isMatch = await comparePassword(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "contraseña incorrecta" });
//     }

//     const token = generateToken({ id: user._id });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 24 * 60 * 60 * 1000,
//     });

//     user.password = undefined;
//     res.status(200).json({ data: user, msg: "login exitoso" });
//   } catch (error) {
//     console.error("EL ERROR REAL ES ESTE 👉", error);
//     res.status(500).json({ msg: "error al intentar iniciar sesion" });
//   }
// };

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(200).json({
      msg: "sesion cerrada correctamente",
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const profile = await UserModel.find({ _id: req.user._id, deleteAt: null });

    if (!profile) {
      return res.status(404).json({ msg: "perfil no encontrao" });
    }
    res
      .status(200)
      .json({ msg: "Perfil obtenido correctamente", data: profile });
  } catch (error) {
    res.status(500).json({ msg: "hubo un error en el servidor" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const camposValidados = matchedData(req);

    const updateQuery = {};
    if (camposValidados.firstName)
      updateQuery["profile.firstName"] = camposValidados.firstName;
    if (camposValidados.lastName)
      updateQuery["profile.lastName"] = camposValidados.lastName;
    if (camposValidados.birthDate)
      updateQuery["profile.birthDate"] = camposValidados.birthDate;
    if (camposValidados.phone)
      updateQuery["profile.phone"] = camposValidados.phone;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateQuery },
      { new: true, runValidators: true },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ msg: "perfil no encontrado" });
    }

    return res
      .status(200)
      .json({ msg: "Perfil modificado con éxito", data: updatedUser });
  } catch (error) {
    console.error("❌ ERROR REAL EN EL UPDATE_PROFILE:", error);
    return res.status(500).json({ msg: "hubo un error en el servidor" });
  }
};

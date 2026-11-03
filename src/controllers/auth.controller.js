import { UserModel } from "../models/UserModel.js";

import { matchedData } from "express-validator";
import { UserModel } from "../models/UserModel.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

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
      password: hashedPassword,
      role: "user",
      profile: data.profile,
    });

    res.status(201).json({ data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error al registrar el usuario en el servidor" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = matchedData(req);
    const user = await UserModel.findOne({ email });
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
    res.status(500).json({ msg: "error al intentar iniciar sesion" });
  }
};

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

export const getProfile = async () => {
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

export const updateProfile = async () => {
  try {
    const user = req.user._id;
    const { data } = matchedData(req);
    const update = await UserModel.findOneAndUpdate(
      user,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!update) {
      return res.status(404).json({ msg: "perfil no encontrao" });
    }

    res.status(200).json({ msg: "Perfil modificado", data: update });
  } catch (error) {
    res.status(500).json({ msg: "hubo un error en el servidor" });
  }
};

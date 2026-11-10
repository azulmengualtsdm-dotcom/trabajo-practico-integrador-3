import jwt from "jsonwebtoken";

export const generateToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || "clave_secreta_de_emergencia_123",
    { expiresIn: "1d" },
  );
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || "clave_secreta_de_emergencia_123",
    );
  } catch (error) {
    return null;
  }
};

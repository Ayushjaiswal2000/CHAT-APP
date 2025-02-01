import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.jwt_secret, {
    expiresIn: "7d",
  });

  res.cookie("jwt_token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return token;
};

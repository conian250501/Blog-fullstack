import jwt from "jsonwebtoken";

export const jwtHelper = {
  createToken: (id: number) => {
    const JWT_NAME = process.env.JWT_OPTIONS_NAME;
    const JWT_SECRET = process.env.JWT_SECRET_KEY;
    return jwt.sign({ name: JWT_NAME, userId: id }, `${JWT_SECRET}`, {
      expiresIn: "1d",
    });
  },
};

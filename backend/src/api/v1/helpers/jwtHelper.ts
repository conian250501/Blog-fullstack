import jwt from "jsonwebtoken";

export const jwtHelper = {
  createToken: (id: number) => {
    const token = jwt.sign(
      { name: `${process.env.JWT_OPTIONS_NAME}`, sub: id },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: "1d",
      }
    );
    return token;
  },
};

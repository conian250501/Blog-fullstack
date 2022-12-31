import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = {
  verifyToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization as string;
      const jwtPayload = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);

      if (jwtPayload) {
        next(jwtPayload);
      } else {
        res.status(401).json({ message: "Please login first" });
      }
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  },
};

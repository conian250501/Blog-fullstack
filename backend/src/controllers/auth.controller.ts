import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/database.config";
import { User } from "../entity/user.entity";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await dataSource.getRepository(User).create(req.body);
      const results = await dataSource.getRepository(User).save(user);
      res.json(results);
    } catch (error) {
      next(error);
    }
  },
  login: (req: Request, res: Response, next: NextFunction) => {},
  checkLogin: (req: Request, res: Response, next: NextFunction) => {},
  logout: (req: Request, res: Response, next: NextFunction) => {},
};

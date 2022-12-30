import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import bcrypt from "bcrypt";
import { jwtHelper } from "../helpers/jwtHelper";

export const authController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const userExisted = await User.findOne({
        where: { email: email },
      });

      if (userExisted) {
        return res.status(200).json({ message: "User already exists" });
      } else {
        // Hash password
        const passwordHased = await bcrypt.hash(password, 10);
        // Save user
        const user: User = User.create({
          ...req.body,
          password: passwordHased,
        });

        // CREATE TOKEN
        const token = await jwtHelper.createToken(user.id);
        user.token = token;

        await User.save(user);
        res.json({ data: user });
      }
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });
      !user && res.status(200).json({ message: "User dont exist" });

      // CHECK VERIFY
      user &&
        !user.verify &&
        res.status(200).json({ message: "Email doesn't verify" });

      const isValidPassword = await bcrypt.compare(
        password,
        user ? user.password : ""
      );

      !isValidPassword &&
        res.status(200).json({ message: "Password incorrect" });

      res.status(200).json({ user, message: "Login successful" });
    } catch (error) {
      next(error);
    }
  },
  checkLogin: (req: Request, res: Response, next: NextFunction) => {},
  logout: (req: Request, res: Response, next: NextFunction) => {},
};

import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/user.entity";
import { jwtHelper } from "../helpers/jwtHelper";

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The User managing API
 * 
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - avatar
 *         - email
 *       properties:
 *         id:
 *           type: number
 *           description: The auto-generated id of the user
 *         avatar:
 *           type: string
 *           description: avatar of the user
 *         email:
 *           type: string
 *           description: email of the user
 *         name:
 *           type: string
 *           description: name of the user
 *         password:
 *           type: string
 *           description: email of the user
 *         isAdmin:
 *           type: boolean
 *           description: check role of the user
 *         token:
 *           type: string
 *           description: token of the user
 *         createdAt:
 *           type: Date
 *           description: Date create blog
 *         updatedAt:
 *           type: Date
 *           description: Date update blog
 *
 *       example:
 *         id: 6
 *         avatar: null
 *         email: "conian2505@gmail.com"
 *         name: null
 *         password: "$2b$10$yLTC8Q2Vh4Iu2HsXvGN61.7HBPOOIIedKRskg6RD5ux2d9U60ucay"
 *         isAdmin: true
 *         verify: false
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY29uaWFuZ3V5cyIsInN1YiI6NiwiaWF0IjoxNjczMjY4NjgyLCJleHAiOjE2NzMzNTUwODJ9.v-IM0qxOLIDpXTIS8odv_fImn0C4spW2-2PDhTf8Iz4"
 *         createdAt: "2022-12-31T11:47:11.579Z"
 *         updatedAt: "2023-01-06T14:14:52.000Z"
 *
 */
export const authController = {
  /**
   * @swagger
   * /api/v1/register:
   *  post:
   *    summary: Register a new account
   *    tags: [User]
   *    requestBody:
   *      description: Optional for register a new account
   *      content:
   *         application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *               type: string
   *              password:
   *               type: string
   *              passwordConfirm:
   *               type: string
   *    responses:
   *       200:
   *         description: Registed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               items:
   *                 $ref: '#/components/schemas/User'
   *
   */

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

  /**
   * @swagger
   * /api/v1/login:
   *  post:
   *    summary: login app
   *    tags: [User]
   *    requestBody:
   *      description: Optional for login app
   *      content:
   *         application/json:
   *          schema:
   *            type: object
   *            properties:
   *              email:
   *               type: string
   *              password:
   *               type: string
   *
   *    responses:
   *       200:
   *         description: Registed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               items:
   *                 $ref: '#/components/schemas/User'
   *
   */

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email: email } });
      !user && res.status(200).json({ message: "User dont exist" });

      if (user) {
        const isValidPassword = await bcrypt.compare(
          password,
          user ? user.password : ""
        );

        // GENERATE NEW TOKEN
        const newToken = await jwtHelper.createToken(user.id);
        user.token = newToken;
        user.save();

        !isValidPassword &&
          res.status(200).json({ message: "Password incorrect" });

        res.status(200).json({ user, message: "Login successful" });
      }
    } catch (error) {
      next(error);
    }
  },

  /**
   * @swagger
   * /api/v1/logged_in:
   *  get:
   *    summary: check if user is logged in
   *    tags: [User]
   *    responses:
   *       200:
   *         description: Registed successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               proterties:
   *                  isLoggedIn: true
   *
   */
  checkLogin: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtPayload = req.jwtPayload;
      const user = await User.findOneBy({ id: Number(jwtPayload.sub) });
      if (user) {
        res.status(200).json({ user, isLoggin: true });
      } else {
        res.status(401).json({ isLoggin: false });
      }
    } catch (error) {
      next(error);
    }
  },
  logout: async (req: Request, res: Response, next: NextFunction) => {
    const jwtPayload = req.jwtPayload;

    const user = await User.findOneBy({ id: Number(jwtPayload.sub) });
    if (user) {
      res.status(200).json({ message: "Logout successfully" });
    } else {
      res.status(401).json({ message: "Lgout failed" });
    }
  },
};

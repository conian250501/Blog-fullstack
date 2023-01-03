import express from "express";
import { authController } from "../controllers/auth.controller";
import { routerHelper, schemas } from "../helpers/routerHelper";
import { authMiddleware } from "../middlewares/auth.middleware";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  routerHelper.validateBody(schemas.authRegister),
  authController.register
);
authRouter.post(
  "/login",
  routerHelper.validateBody(schemas.authLogin),
  authController.login
);
authRouter.get(
  "/logged_in",
  authMiddleware.verifyToken,
  authController.checkLogin
);
authRouter.get("/logout", authMiddleware.verifyToken, authController.logout);

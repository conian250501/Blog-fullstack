import express from "express";
import { authController } from "../controllers/auth.controller";
import { routerHelper, schemas } from "../helpers/routerHelper";

export const authRouter = express.Router();

authRouter.post(
  "/register",
  routerHelper.validateBody(schemas.authRegister),
  authController.register
);
authRouter.post("/login", authController.login);
authRouter.post("/check-login", authController.checkLogin);
authRouter.post("/logout", authController.logout);

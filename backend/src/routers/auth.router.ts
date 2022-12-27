import express from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = express.Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/check-login", authController.checkLogin);
authRouter.post("/logout", authController.logout);

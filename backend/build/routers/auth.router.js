"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const routerHelper_1 = require("../helpers/routerHelper");
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.authRouter = express_1.default.Router();
exports.authRouter.post("/register", routerHelper_1.routerHelper.validateBody(routerHelper_1.schemas.authRegister), auth_controller_1.authController.register);
exports.authRouter.post("/login", routerHelper_1.routerHelper.validateBody(routerHelper_1.schemas.authLogin), auth_controller_1.authController.login);
exports.authRouter.get("/logged_in", auth_middleware_1.authMiddleware.verifyToken, auth_controller_1.authController.checkLogin);
exports.authRouter.get("/logout", auth_controller_1.authController.logout);

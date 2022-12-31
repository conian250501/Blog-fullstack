"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./auth.router");
exports.rootRouter = express_1.default.Router();
exports.rootRouter.use(auth_router_1.authRouter);

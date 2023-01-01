import express from "express";
import { authRouter } from "./auth.router";
import { blogRouter } from "./blog.router";
import { categoryRouter } from "./category.router";

export const rootRouter = express.Router();

rootRouter.use("/category", categoryRouter);
rootRouter.use("/blog", blogRouter);
rootRouter.use(authRouter);

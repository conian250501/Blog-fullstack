import express from "express";
import { blogController } from "../controllers/blog.controller";

export const blogRouter = express.Router();

blogRouter.get("/get_all", blogController.getAll);
blogRouter.get("/:blogId", blogController.getDetail);
blogRouter.get("/create", blogController.create);
blogRouter.get("/update/::blogId", blogController.update);
blogRouter.get("/delete/:blogId", blogController.delete);

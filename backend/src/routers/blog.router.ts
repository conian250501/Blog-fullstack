import express from "express";
import { blogController } from "../controllers/blog.controller";
import { routerHelper, schemas } from "../helpers/routerHelper";
import { authMiddleware } from "../middlewares/auth.middleware";

export const blogRouter = express.Router();

blogRouter.get("/category", blogController.getByNameCategory);
blogRouter.get("/category/:categoryId", blogController.getByCategory);
blogRouter.get("/get_all", blogController.getAll);
blogRouter.get("/:blogId", blogController.getDetail);
blogRouter.post(
  "/create",
  routerHelper.validateBody(schemas.blogCreateSchema),
  authMiddleware.verifyToken,
  blogController.create
);
blogRouter.put(
  "/update/:blogId",
  routerHelper.validateBody(schemas.blogUpdateSchema),
  authMiddleware.verifyToken,
  blogController.update
);
blogRouter.delete(
  "/delete/:blogId",
  authMiddleware.verifyToken,
  blogController.delete
);

// FOR LOGGED IN
blogRouter.get(
  "/get_all/user",
  authMiddleware.verifyToken,
  blogController.getAllOfUser
);

import express from "express";
import { categoryController } from "../controllers/category.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";

export const categoryRouter = express.Router();

categoryRouter.get("/get_all", categoryController.getAll);
categoryRouter.get("/:categoryId", categoryController.getDetail);
categoryRouter.post(
  "/create",
  authMiddleware.verifyToken,
  roleMiddleware.checkAdmin,
  categoryController.create
);
categoryRouter.put(
  "/update/:categoryId",
  authMiddleware.verifyToken,
  roleMiddleware.checkAdmin,

  categoryController.update
);
categoryRouter.delete(
  "/delete/:categoryId",
  authMiddleware.verifyToken,
  roleMiddleware.checkAdmin,
  categoryController.delete
);

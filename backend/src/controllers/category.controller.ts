import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Category } from "../entity/category.entity";
import { User } from "../entity/user.entity";

export const categoryController = {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await Category.find();
      categories
        ? res
            .status(200)
            .json({ categories, message: "Get all categories successfully" })
        : res.status(200).json({ message: "Get all categories failed" });
    } catch (error) {
      next(error);
    }
  },
  getDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;

      const category = await Category.findOneBy({ id: Number(categoryId) });
      category
        ? res
            .status(200)
            .json({ category, message: "Get category successfully" })
        : res.status(200).json({ message: "Category not found" });
    } catch (error) {
      next(error);
    }
  },
  create: async (
    user: User,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;
      const category = Category.create({ name });
      await category.save();
      res.status(200).json({ category, message: "Created successfully" });
    } catch (error) {
      next(error);
    }
  },
  update: async (
    user: User,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { categoryId } = req.params;
      const { name } = req.body;

      const result = await Category.update(categoryId, { name: name });
      if (result) {
        return res.status(200).json({ message: "Updated successfully" });
      } else {
        return res.status(200).json({ message: "Updated failure" });
      }
    } catch (error) {
      next(error);
    }
  },
  delete: async (
    user: User,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { categoryId } = req.params;
      const result = await Category.delete(categoryId);

      result.affected
        ? res.status(200).json({ message: "Deleted successfully" })
        : res.status(200).json({ message: "Deleted failure" });
    } catch (error) {
      next(error);
    }
  },
};

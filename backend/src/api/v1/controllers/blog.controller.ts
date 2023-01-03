import { faker } from "@faker-js/faker";
import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { Blog } from "../entity/blog.entity";
import { Category } from "../entity/category.entity";
import { User } from "../entity/user.entity";

export const blogController = {
  getAllOfUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const jwtPayload = req.jwtPayload;
      const user = await User.findOneBy({ id: Number(jwtPayload.sub) });
      if (user) {
        const page: number = Number(req.query.page) || 1;
        const perPage: number = Number(req.query.limit) || 4;
        const total = await Blog.createQueryBuilder("blog")
          .where("blog.user = :id", { id: user.id })
          .getCount();

        const blogs = await Blog.createQueryBuilder("blog")
          .select(["blog", "user.id", "user.name", "user.email"])
          .leftJoin("blog.user", "user")
          .leftJoin("blog.categories", "category")
          .offset((page - 1) * perPage)
          .limit(perPage)
          .where("blog.user = :id", { id: user.id })
          .getMany();

        res.status(200).json({
          blogs,
          page,
          per_page: blogs.length,
          last_page: Math.ceil(total / perPage),
          total,
          message: "successfull",
        });
      } else {
        res.status(200).json({ message: "failure" });
      }
    } catch (error) {
      next(error);
    }
  },
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page: number = Number(req.query.page) || 1;
      const perPage = Number(req.query.limit) || 4;
      const total = await Blog.createQueryBuilder("blog").getCount();

      const blogs = await Blog.createQueryBuilder("blog")
        .select(["blog", "user.id", "user.name", "user.email", "category.name"])
        .leftJoin("blog.user", "user")
        .leftJoin("blog.categories", "category")
        .offset((page - 1) * perPage)
        .limit(perPage)
        .getMany();

      res.status(200).json({
        blogs,
        page,
        total,
        per_page: blogs.length,
        last_page: Math.ceil(total / perPage),
        message: "Get all blog successfull",
      });
    } catch (error) {
      next(error);
    }
  },
  getDetail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogId } = req.params;
      const blog = await Blog.find({
        where: { id: blogId },
        relations: { categories: true },
      });

      blog
        ? res.status(200).json({ blog, message: "Get blog successfull" })
        : res.status(404).json({ message: "Blog not found" });
    } catch (error) {
      next(error);
    }
  },
  getByCategory: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params;

      const blogs = await Blog.query(
        `SELECT blog.*, category.name as category
          FROM blog 
            LEFT JOIN blog_categories_category ON blog.id = blog_categories_category.blogId 
            LEFT JOIN category ON category.id = blog_categories_category.categoryId 
          WHERE category.id = ?`,
        [categoryId]
      );

      res.status(200).json({ blogs, message: "Successfull" });
    } catch (error) {
      next(error);
    }
  },
  getByNameCategory: async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { name } = req.query;

      const blogs = await Blog.query(
        `SELECT blog.*, category.name as category
          FROM blog 
            LEFT JOIN blog_categories_category ON blog.id = blog_categories_category.blogId 
            LEFT JOIN category ON category.id = blog_categories_category.categoryId 
          WHERE category.name = ?`,
        [name]
      );

      res.status(200).json({ blogs, message: "Successfull" });
    } catch (error) {
      next(error);
    }
  },
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, categoryName } = req.body;
      const jwtPayload = req.jwtPayload;

      const user = await User.findOneBy({ id: Number(jwtPayload.sub) });

      const category = await Category.findOneBy({ name: categoryName });

      if (category) {
        if (user) {
          const newBlog = Blog.create({
            title: faker.lorem.word(),
            content: faker.lorem.paragraphs(),
            user,
            categories: [category],
          });
          await newBlog.save();
          res.status(200).json({ newBlog, message: "Created successfully" });
        }
      } else {
        res.status(200).json({ message: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, content, categoryName } = req.body;

      const { blogId } = req.params;
      const category = await Category.findOneBy({ name: categoryName });

      if (category) {
        const newBlog = await Blog.findOneBy({ id: blogId });

        if (newBlog) {
          newBlog.title = title;
          newBlog.content = content;
          newBlog.categories = [category];
          await newBlog.save();

          return res
            .status(200)
            .json({ newBlog, message: "Updated successfully" });
        } else {
          return res.status(404).json({ message: "Blog not found" });
        }
      } else {
        return res.status(404).json({ message: "Category not found" });
      }
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { blogId } = req.params;
      const result = await Blog.delete(blogId);

      Number(result.affected) > 0
        ? res.status(200).json({ message: "Deleted successfully" })
        : res.status(200).json({ message: "Deleted failure" });
    } catch (error) {
      next(error);
    }
  },
};

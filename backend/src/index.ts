"use strict";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { rootRouter } from "./api/v1/routers/rootRouter";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import * as reflectMetadata from "reflect-metadata";
import { createConnection } from "typeorm";
import { dataSource } from "./api/v1/config/db.config";
import { User } from "./api/v1/entity/user.entity";
import { faker } from "@faker-js/faker";
import { Blog } from "./api/v1/entity/blog.entity";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const main = async () => {
  try {
    // Connect to database
    await dataSource
      .initialize()
      .then(() => {
        console.log(`Connected to MySQL`);
      })
      .catch((err) => console.log(err));

    // Library support
    app.use(
      cors({
        origin: "*",
        methods: ["GET", "PUT", "POST", "PATCH"],
      })
    );
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Root Router
    app.use("/api/v1", rootRouter);

    // Handle Error
    app.use((req: Request, res: Response, next: NextFunction) => {
      const error = new Error("Not Found");
      next(error);
    });
    app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
      res.status(500).json({
        message: error.message,
      });
    });

    app.listen(PORT, () => {
      console.log(`Serving on port: http://localhost:${PORT}`);
    });
  } catch (error) {
    throw new Error("Connection error: " + error);
  }
};

main();

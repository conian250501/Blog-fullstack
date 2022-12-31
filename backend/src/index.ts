"use strict";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { rootRouter } from "./routers/rootRouter";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import * as reflectMetadata from "reflect-metadata";
import { createConnection } from "typeorm";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

const main = async () => {
  try {
    await createConnection({
      type: "mysql",
      username: "root",
      password: "minhtaiday3214",
      database: "Blog-app",
      logging: false,
      synchronize: true,
      migrationsTableName: "migrations",
      entities: ["src/entity/**/*.ts"],
      migrations: ["src/migrations/**/*.ts"],
      subscribers: ["src/subscriber/**/*.ts"],
    });

    console.log(`Connected to MySQL`);

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
      res.status(404).json({
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

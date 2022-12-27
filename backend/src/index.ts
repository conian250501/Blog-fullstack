"use strict";
import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { rootRouter } from "./routers/rootRouter";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import { dataSource } from "./config/database.config";
import * as reflectMetadata from "reflect-metadata";

dotenv.config();

dataSource
  .initialize()
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch((err) => {
    console.log(err);
  });
const PORT = process.env.PORT || 3000;
const app = express();

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

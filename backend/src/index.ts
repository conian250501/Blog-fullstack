"use strict";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import { dataSource } from "./api/v1/config/db.config";
import { rootRouter } from "./api/v1/routers/rootRouter";
import swaggerUi from "swagger-ui-express";

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

    // Swagger UI
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Blog API",
          version: "1.0.0",
          description: "This is api for  Blog WebApp",
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
        server: [
          {
            url: "http://localhost:4000",
          },
        ],
      },
      apis: ["./src/api/v1/controllers/*.ts"],
    };

    const specs = swaggerJSDoc(options);
    app.use("/blog-docs", swaggerUi.serve, swaggerUi.setup(specs));

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

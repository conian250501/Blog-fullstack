"use strict";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Application, NextFunction, Request, Response } from "express";
import helmet from "helmet";
import morgan from "morgan";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import rootRouter from "./routers";


interface ApiInterface {
  server(): Promise<Application>;
}


class Api implements ApiInterface {
  async server(): Promise<Application> {
    const app = express();

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
    app.use("/api/v1", rootRouter.routes);

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

    return app
  }
}
export default new Api();

"use strict";
import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    data: "asdas",
  });
});

app.listen(PORT, () => {
  console.log(`Serving on port: http://localhost:${PORT}`);
});

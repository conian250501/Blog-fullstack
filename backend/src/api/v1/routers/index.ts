import { Router } from "express";
import { IRouter } from "./interface/IRouter";
import authRouter from "./auth.router";

const router = Router();
class RootRouter implements IRouter {
  get routes() {
    router.use("/auth", authRouter.routes)
    // router.use("/blogs", )
    // router.use("/categories", )
    return router
  }
}

export default new RootRouter();
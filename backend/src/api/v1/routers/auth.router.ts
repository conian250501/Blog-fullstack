import { Router } from "express";
import { IRouter } from "./interface/IRouter";

const router = Router()
class AuthRouter implements IRouter{
  get routes() { 
    return router
  }
}

export default new AuthRouter();
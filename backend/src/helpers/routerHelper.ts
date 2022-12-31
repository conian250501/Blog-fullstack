import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const schemas = {
  authRegister: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .min(8)
      // .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    passwordConfirm: Joi.ref("password"),
  }),
  authLogin: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
  }),
};

export const routerHelper = {
  validateBody: (schema: any) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const result = schema.validate(req.body);
      if (result.error) {
        res.status(400).json({ message: result.error.details[0].message });
      } else {
        next();
      }
    };
  },
};

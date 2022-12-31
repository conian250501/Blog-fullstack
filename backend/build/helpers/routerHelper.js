"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerHelper = exports.schemas = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schemas = {
    authRegister: joi_1.default.object({
        email: joi_1.default.string().email().required(),
        password: joi_1.default.string()
            .min(8)
            // .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            .required(),
        passwordConfirm: joi_1.default.ref("password"),
    }),
    authLogin: joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().min(8).required(),
    }),
};
exports.routerHelper = {
    validateBody: (schema) => {
        return (req, res, next) => {
            const result = schema.validate(req.body);
            if (result.error) {
                res.status(400).json({ message: result.error.details[0].message });
            }
            else {
                next();
            }
        };
    },
};

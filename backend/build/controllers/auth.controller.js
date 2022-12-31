"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const user_entity_1 = require("../entity/user.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelper_1 = require("../helpers/jwtHelper");
exports.authController = {
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userExisted = yield user_entity_1.User.findOne({
                where: { email: email },
            });
            if (userExisted) {
                return res.status(200).json({ message: "User already exists" });
            }
            else {
                // Hash password
                const passwordHased = yield bcrypt_1.default.hash(password, 10);
                // Save user
                const user = user_entity_1.User.create(Object.assign(Object.assign({}, req.body), { password: passwordHased }));
                // CREATE TOKEN
                const token = yield jwtHelper_1.jwtHelper.createToken(user.id);
                user.token = token;
                yield user_entity_1.User.save(user);
                res.json({ data: user });
            }
        }
        catch (error) {
            next(error);
        }
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const user = yield user_entity_1.User.findOne({ where: { email: email } });
            !user && res.status(200).json({ message: "User dont exist" });
            // CHECK VERIFY
            // user &&
            //   !user.verify &&
            //   res.status(200).json({ message: "Email doesn't verify" });
            const isValidPassword = yield bcrypt_1.default.compare(password, user ? user.password : "");
            !isValidPassword &&
                res.status(200).json({ message: "Password incorrect" });
            res.status(200).json({ user, message: "Login successful" });
        }
        catch (error) {
            next(error);
        }
    }),
    checkLogin: (req, res, next) => { },
    logout: (req, res, next) => { },
};

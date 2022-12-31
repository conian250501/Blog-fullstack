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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const rootRouter_1 = require("./routers/rootRouter");
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const typeorm_1 = require("typeorm");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, typeorm_1.createConnection)({
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
        app.use((0, cors_1.default)({
            origin: "*",
            methods: ["GET", "PUT", "POST", "PATCH"],
        }));
        app.use((0, helmet_1.default)());
        app.use((0, morgan_1.default)("dev"));
        app.use(body_parser_1.default.json());
        app.use(body_parser_1.default.urlencoded({ extended: true }));
        // Root Router
        app.use("/api/v1", rootRouter_1.rootRouter);
        // Handle Error
        app.use((req, res, next) => {
            const error = new Error("Not Found");
            next(error);
        });
        app.use((error, req, res, next) => {
            res.status(404).json({
                message: error.message,
            });
        });
        app.listen(PORT, () => {
            console.log(`Serving on port: http://localhost:${PORT}`);
        });
    }
    catch (error) {
        throw new Error("Connection error: " + error);
    }
});
main();

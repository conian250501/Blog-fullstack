import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";
import { Blog } from "./entity/blog.entity";
import { Category } from "./entity/category.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  username: "root",
  password: "minhtaiday3214",
  database: "Blog-app",
  logging: false,
  synchronize: false,
  migrationsTableName: "migrations",
  entities: [
    User,
    Blog,
    Category
  ],
  migrations: ["src/api/v1/database/migrations/**/*.ts"],
  subscribers: ["src/api/v1/subscriber/**/*.ts"],
});

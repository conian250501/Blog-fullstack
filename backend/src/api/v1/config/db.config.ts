import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  username: "root",
  password: "minhtaiday3214",
  database: "Blog-app",
  logging: false,
  synchronize: true,
  migrationsTableName: "migrations",
  entities: ["src/api/v1/entity/**/*.ts"],
  migrations: ["src/api/v1/migrations/**/*.ts"],
  subscribers: ["src/api/v1/subscriber/**/*.ts"],
});

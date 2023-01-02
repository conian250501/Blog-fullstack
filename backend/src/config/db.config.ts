import { DataSource } from "typeorm";

export const dataSource = new DataSource({
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

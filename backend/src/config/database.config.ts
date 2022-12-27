import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "mysql",
  username: "root",
  password: "minhtaiday3214",
  database: "Blog-app",
  entities: ["src/entity/*.ts"],
  logging: false,
  synchronize: true,
  migrations: [],
});

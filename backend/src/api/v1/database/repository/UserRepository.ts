import { Repository } from "typeorm";
import IUserRepository from "./interface/IUserRepository";
import { User } from "../entity/user.entity";
import { AppDataSource } from "../data-source";

class UserReposiory implements IUserRepository{
  repo: Repository<User>

  constructor() {
    this.repo = AppDataSource.getRepository(User);
  }

  getAll() {
    return this.repo.find();
  }
}
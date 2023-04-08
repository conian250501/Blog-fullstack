import { User } from "../../entity/user.entity";

export default interface IUserRepository {
  getAll(): Promise<User[]>
}
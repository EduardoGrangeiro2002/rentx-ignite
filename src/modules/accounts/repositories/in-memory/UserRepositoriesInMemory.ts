import { User } from "@modules/accounts/infra/typeorm/Entities/User";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepositories } from "../IUserRepositories";

class UserRepositoryInMemory implements IUserRepositories {
  users: User[] = [];

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { name, email, driver_license, password });

    this.users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }
  async list(): Promise<User[]> {
    return this.users;
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }
}

export { UserRepositoryInMemory };

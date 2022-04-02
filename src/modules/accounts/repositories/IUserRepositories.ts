import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/Entities/User";

interface IUserRepositories {
  create(data: ICreateUserDTO): Promise<void>;

  findByEmail(email: string): Promise<User>;

  list(): Promise<User[]>;

  findById(id: string): Promise<User>;
}

export { IUserRepositories };

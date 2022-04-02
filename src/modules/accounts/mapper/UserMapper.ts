import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/Entities/User";

class UserMapper {
  static toDTO({
    avatar,
    created_at,
    driver_license,
    email,
    name,
    id,
    avatarUrl,
  }: User): IUserResponseDTO {
    const user = instanceToInstance({
      avatar,
      created_at,
      driver_license,
      email,
      name,
      id,
      avatarUrl,
    });
    return user;
  }
}

export { UserMapper };

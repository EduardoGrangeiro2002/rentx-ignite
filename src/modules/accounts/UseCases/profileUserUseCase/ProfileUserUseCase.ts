import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import { UserMapper } from "@modules/accounts/mapper/UserMapper";
import { IUserRepositories } from "@modules/accounts/repositories/IUserRepositories";

@injectable()
export class ProfileUserUseCase {
  constructor(
    @inject("UsersRepositories")
    private userRepository: IUserRepositories
  ) {}
  async execute(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);

    return UserMapper.toDTO(user);
  }
}

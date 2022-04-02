import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { UsersTokens } from "@modules/accounts/infra/typeorm/Entities/UsersTokens";
import { IUsersTokensRepository } from "../IUsersTokensRepository";



export class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
    userTokensRepository: UsersTokens[] = [];

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersTokens> {
      const userTokens = new UsersTokens();

      Object.assign(userTokens, {expires_date, refresh_token, user_id});

      this.userTokensRepository.push(userTokens);

      return userTokens;
    }
    async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UsersTokens> {
        const userTokens = await this.userTokensRepository.find((ut) => {
            ut.user_id === user_id && ut.refresh_token === token
        });
        return userTokens;
    }
    async deleteById(id: string): Promise<void> {
      const userTokens = this.userTokensRepository.find((ut) => ut.id === id);

      this.userTokensRepository.splice(this.userTokensRepository.indexOf(userTokens))
    }
    async findByRefreshToken(token: string): Promise<UsersTokens> {
      const userTokens = this.userTokensRepository.find((ut)=> ut.refresh_token === token);

      return userTokens;
    }

}
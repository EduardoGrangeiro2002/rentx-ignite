import { ICreateUserTokensDTO } from "@modules/accounts/dtos/ICreateUserTokensDTO";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { getRepository, Repository } from "typeorm";
import { UsersTokens } from "../Entities/UsersTokens";



export class UsersTokensRepository implements IUsersTokensRepository {
  private readonly usersTokensRepository: Repository<UsersTokens>
    constructor(){
        this.usersTokensRepository = getRepository(UsersTokens);
    }
  async findByRefreshToken(token: string): Promise<UsersTokens> {
    return await this.usersTokensRepository.findOne({refresh_token: token})
  }
    async deleteById(id: string): Promise<void> {
      await this.usersTokensRepository.delete(id)
  }
    async findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UsersTokens> {
      const userTokens = await this.usersTokensRepository.findOne({user_id, refresh_token: token})

      return userTokens
  }
    async create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersTokens> {
      
      const newToken =  this.usersTokensRepository.create({expires_date, refresh_token, user_id});

      await this.usersTokensRepository.save(newToken)

      return newToken
    }

    

}
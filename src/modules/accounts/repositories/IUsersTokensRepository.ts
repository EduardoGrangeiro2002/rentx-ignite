import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UsersTokens } from "../infra/typeorm/Entities/UsersTokens";



export interface IUsersTokensRepository {
  create({ expires_date, refresh_token, user_id }: ICreateUserTokensDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken(user_id: string, token: string): Promise<UsersTokens>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(token: string):Promise<UsersTokens>;
}
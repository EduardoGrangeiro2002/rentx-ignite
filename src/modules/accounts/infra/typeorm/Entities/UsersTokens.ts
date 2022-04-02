import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid"

@Entity("users_tokens")
export class UsersTokens {
  
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  refresh_token: string;

  @CreateDateColumn()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuidV4();
    }
  }
}
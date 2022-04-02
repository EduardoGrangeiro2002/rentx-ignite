import { Car } from '@modules/cars/infra/typeorm/Entities/Car';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid'

@Entity("rentals")
 class Rental {

  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Car)
  @JoinColumn({name: "car_id"})
  car: Car

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  start_date: Date;

  @Column({nullable: true})
  end_date: Date;

  @CreateDateColumn()
  expected_return_date: Date;

  @Column({nullable: true})
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;
  
  constructor(){
      if(!this.id){
        this.id = uuidV4()  
      }
  }
}

export { Rental }
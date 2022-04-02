import { Specification } from "../infra/typeorm/Entities/Specification";

interface ICreateCarsDTO {
  name: string;

  description: string;
  
  daily_rate: number;
  
  license_plate: string;
  
  fine_amount: number;
  
  brand: string;
  
  category_id: string;

  specification?: Specification[];

  id?:string
  
}

export { ICreateCarsDTO };

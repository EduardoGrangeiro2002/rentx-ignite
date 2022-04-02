import { getRepository, Repository } from "typeorm";

import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

import { CarImages } from "../Entities/CarImages";

class CarImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImages>;
  constructor() {
    this.repository = getRepository(CarImages);
  }
  async create(car_id: string, image_name: string): Promise<CarImages> {
    const carsImages = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(carsImages);

    return carsImages;
  }
}

export { CarImagesRepository };

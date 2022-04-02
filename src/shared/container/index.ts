import { container } from "tsyringe";

import "./providers";

import { UsersRepositories } from "@modules/accounts/infra/typeorm/repositories/UsersRepositories";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { IUserRepositories } from "@modules/accounts/repositories/IUserRepositories";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { CarImagesRepository } from "@modules/cars/infra/typeorm/repositories/CarImagesRepository";
import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICategoryRepositoryInterface } from "@modules/cars/repositories/ICategoriesRepositoryInterface";
import { ISpecificatiosRepository } from "@modules/cars/repositories/ISpecificatiosRepository";
import { RentalsRepository } from "@modules/rentals/infra/typeorm/repositories/RentalsRepository";
import { IRepositoryRentals } from "@modules/rentals/repositories/IRepositoryRentals";

container.registerSingleton<ICategoryRepositoryInterface>(
  "CategoriesRepository",
  CategoriesRepository
);

container.registerSingleton<ISpecificatiosRepository>(
  "SpecificationsRepository",
  SpecificationRepository
);
container.registerSingleton<IUserRepositories>(
  "UsersRepositories",
  UsersRepositories
);

container.registerSingleton<ICarsRepository>("CarsRepository", CarsRepository);

container.registerSingleton<ICarsImagesRepository>(
  "CarsImages",
  CarImagesRepository
);

container.registerSingleton<IRepositoryRentals>(
  "RentalsRepository",
  RentalsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);

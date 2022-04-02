"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _SpecificationRepositoryInMemory = require("@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory");

var _AppError = require("@shared/error/AppError");

var _CreateCarSpecificationUseCase = require("./CreateCarSpecificationUseCase");

let createCarSpecificationUseCase;
let carsRepository;
let specificationRepository;
describe("Create Car Specificatoin", () => {
  beforeEach(() => {
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    specificationRepository = new _SpecificationRepositoryInMemory.SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new _CreateCarSpecificationUseCase.CreateCarSpecificationUseCase(carsRepository, specificationRepository);
  });
  it("Should not be able to add a new specification to a now-existent car", async () => {
    const specifications_id = ["54321"];
    const car_id = "1234";
    await expect(createCarSpecificationUseCase.execute({
      car_id,
      specifications_id
    })).rejects.toEqual(new _AppError.AppError("Cars does not exists"));
  });
  it("Should be able to add a new specification to the car", async () => {
    const specification = await specificationRepository.create({
      name: "Super sport",
      description: "Carro veloz"
    });
    const specifications_id = [specification.id];
    const car = await carsRepository.create({
      name: "Name Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id
    });
    expect(specificationCars).toHaveProperty("specification");
    expect(specificationCars.specification.length).toBe(1);
  });
});
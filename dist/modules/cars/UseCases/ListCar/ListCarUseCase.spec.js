"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

var _createCarUseCase = require("../createCar/createCarUseCase");

var _ListCarUseCase = require("./ListCarUseCase");

let listCarUseCase;
let carsRepositoryInMemory;
let createCarUseCase;
describe("List cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listCarUseCase = new _ListCarUseCase.ListCarUseCase(carsRepositoryInMemory);
    createCarUseCase = new _createCarUseCase.CreateCarUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list all avaliable cars", async () => {
    const car = await createCarUseCase.execute({
      name: "Car1",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category"
    });
    const cars = await listCarUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all avaliable car by brand", async () => {
    const car = await createCarUseCase.execute({
      name: "Car3",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Audi",
      category_id: "category"
    });
    const cars = await listCarUseCase.execute({
      brand: "Audi"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all avaliable car by name", async () => {
    const car = await createCarUseCase.execute({
      name: "Car3",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Audi",
      category_id: "category"
    });
    const cars = await listCarUseCase.execute({
      name: "Audi A1"
    });
    expect(cars).toEqual([car]);
  });
  it("Should be able to list all avaliable car by category_id", async () => {
    const car = await createCarUseCase.execute({
      name: "Car3",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Audi",
      category_id: "category"
    });
    const cars = await listCarUseCase.execute({
      category_id: "category"
    });
    expect(cars).toEqual([car]);
  });
});
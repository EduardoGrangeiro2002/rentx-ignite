"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));

var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");

var _AppError = require("@shared/error/AppError");

var _RepositoryRentalsInMemory = require("../../repositories/implementations/RepositoryRentalsInMemory");

var _CreateRentalsUseCase = require("./CreateRentalsUseCase");

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createRentalUseCase;
let repositoryRentalsInMemory;
let dayjsDateProvider;
let carsRepository;
describe("Create rental", () => {
  const dayAdd24h = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    repositoryRentalsInMemory = new _RepositoryRentalsInMemory.RepositoryRentalsInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepository = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalUseCase = new _CreateRentalsUseCase.CreateRentalUseCase(repositoryRentalsInMemory, dayjsDateProvider, carsRepository);
  });
  it("Should be able to create a rental", async () => {
    const car = await carsRepository.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      expected_return_date: dayAdd24h,
      user_id: "321445"
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("Should not be able to create a new rental if there is another open to the same user ", async () => {
    const car = await carsRepository.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand"
    });
    await createRentalUseCase.execute({
      car_id: car.id,
      expected_return_date: dayAdd24h,
      user_id: "321445"
    });
    await expect(createRentalUseCase.execute({
      car_id: "test",
      expected_return_date: dayAdd24h,
      user_id: "321445"
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for user!"));
  });
  it("Should not be able to create a new rental if there is another open to the same car ", async () => {
    await repositoryRentalsInMemory.create({
      car_id: "1234Abc",
      expected_return_date: dayAdd24h,
      user_id: "12345"
    });
    await expect(createRentalUseCase.execute({
      car_id: "1234Abc",
      expected_return_date: dayAdd24h,
      user_id: "321"
    })).rejects.toEqual(new _AppError.AppError("car is unavailable!"));
  });
  it("Should not be able to create a new rental with invalid return time ", async () => {
    await expect(createRentalUseCase.execute({
      car_id: "1234Abc",
      expected_return_date: (0, _dayjs.default)().toDate(),
      user_id: "XXX"
    })).rejects.toEqual(new _AppError.AppError("Invalid return time, less than 24 hours!"));
  });
});
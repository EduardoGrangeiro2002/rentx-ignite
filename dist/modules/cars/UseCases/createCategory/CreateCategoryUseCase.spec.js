"use strict";

var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");

var _CreateCategoryUseCases = require("@modules/cars/UseCases/createCategory/CreateCategoryUseCases");

var _AppError = require("@shared/error/AppError");

let categoriesRepositoryInMemory;
let createCategoriesUseCase;
describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoriesUseCase = new _CreateCategoryUseCases.CreateCategoryUseCases(categoriesRepositoryInMemory);
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category is test",
      description: "Category description test"
    };
    await createCategoriesUseCase.execute({
      name: category.name,
      description: category.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("must not be able to create a new category with the same existing name", async () => {
    const category = {
      name: "Category is test",
      description: "Category description test"
    };
    await createCategoriesUseCase.execute({
      name: category.name,
      description: category.description
    });
    await expect(createCategoriesUseCase.execute({
      name: category.name,
      description: category.description
    })).rejects.toEqual(new _AppError.AppError("Category already exists"));
  });
});
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCases } from "@modules/cars/UseCases/createCategory/CreateCategoryUseCases";
import { AppError } from "@shared/error/AppError";

let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
let createCategoriesUseCase: CreateCategoryUseCases;

describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoriesUseCase = new CreateCategoryUseCases(
      categoriesRepositoryInMemory
    );
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category is test",
      description: "Category description test",
    };

    await createCategoriesUseCase.execute({
      name: category.name,
      description: category.description,
    });

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("must not be able to create a new category with the same existing name", async () => {
    const category = {
      name: "Category is test",
      description: "Category description test",
    };

    await createCategoriesUseCase.execute({
      name: category.name,
      description: category.description,
    });
    await expect(
       createCategoriesUseCase.execute({
        name: category.name,
        description: category.description,
      })
    ).rejects.toEqual(new AppError("Category already exists"));
  });
});

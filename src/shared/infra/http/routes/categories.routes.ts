import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/UseCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/UseCases/ImportCategory/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/UseCases/ListCategory/ListCategoryController";
import { ensureAuthenticated } from "../middlewares/ensureAuthentication";
import ensureAdmin from "../middlewares/ensureAdmin";

const upload = multer({
  dest: "./tmp",
});
const categoriesRoutes = Router();

const createCategoryControler = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoryController = new ListCategoryController();

categoriesRoutes.post("/", ensureAuthenticated, ensureAdmin, createCategoryControler.handle);

categoriesRoutes.post(
  "/import",
  upload.single("file"),ensureAuthenticated, ensureAdmin,
  importCategoryController.handle
);
categoriesRoutes.get("/", listCategoryController.handle);

export { categoriesRoutes };

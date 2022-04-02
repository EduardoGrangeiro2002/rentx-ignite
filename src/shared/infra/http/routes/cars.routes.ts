import { Router } from "express";
import multer from "multer";

import uploadConfig from "@configs/upload";
import { CreateCarController } from "@modules/cars/UseCases/createCar/createCarController";
import { CreateCarSpecificationControler } from "@modules/cars/UseCases/createCarSpecification/CreateCarSpecificationController";
import { ListCarController } from "@modules/cars/UseCases/ListCar/ListCarController";
import { UploadImageController } from "@modules/cars/UseCases/uploadCarImages/uploadCarImagesController";

import ensureAdmin from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthentication";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listCarController = new ListCarController();
const createCarSpecificationController = new CreateCarSpecificationControler();
const uploadImagesController = new UploadImageController();

const upload = multer(uploadConfig);

carRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle
);

carRoutes.get("/available", listCarController.handle);

carRoutes.post(
  "/specification_cars/:id",
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle
);

carRoutes.post(
  "/images/:id",
  ensureAuthenticated,
  ensureAdmin,
  upload.array("images"),
  uploadImagesController.handle
);

export { carRoutes };

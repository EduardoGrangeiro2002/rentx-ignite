import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/UseCases/CreateSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/UseCases/ListSpecification/ListSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthentication";
import ensureAdmin from "../middlewares/ensureAdmin";

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController();

const listSpecificationController = new ListSpecificationController();

specificationRouter.use(ensureAuthenticated);

specificationRouter.post("/",ensureAdmin, createSpecificationController.handle);

specificationRouter.get("/", listSpecificationController.handle);

export { specificationRouter };

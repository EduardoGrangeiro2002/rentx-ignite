import { CreateRentalsController } from "@modules/rentals/UseCases/createRental/CreateRentalsController";
import { DevolutionRentalsController } from "@modules/rentals/UseCases/devolutionRental/DevolutionRentallController";
import { ListRentalByUserController } from "@modules/rentals/UseCases/listRentalByUser/ListRentalByUserController";
import { Router } from "express";
import ensureAdmin from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthentication";


const rentalRoutes = Router();

const createRentalController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalsController();
const listRentalByUserController = new ListRentalByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/", ensureAuthenticated, listRentalByUserController.handle)


export { rentalRoutes }
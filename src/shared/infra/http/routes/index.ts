import { Router } from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { carRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalRoutes } from "./rental.routes";
import { specificationRouter } from "./specifications.routes";
import { UserRouter } from "./user.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/users", UserRouter);
router.use("/cars", carRoutes)
router.use("/rentals", rentalRoutes)
router.use(authenticateRoutes);
router.use("/password", passwordRoutes);

export { router };

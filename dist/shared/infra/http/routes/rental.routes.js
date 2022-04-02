"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;

var _CreateRentalsController = require("@modules/rentals/UseCases/createRental/CreateRentalsController");

var _DevolutionRentallController = require("@modules/rentals/UseCases/devolutionRental/DevolutionRentallController");

var _ListRentalByUserController = require("@modules/rentals/UseCases/listRentalByUser/ListRentalByUserController");

var _express = require("express");

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalsController.CreateRentalsController();
const devolutionRentalController = new _DevolutionRentallController.DevolutionRentalsController();
const listRentalByUserController = new _ListRentalByUserController.ListRentalByUserController();
rentalRoutes.post("/", _ensureAuthentication.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthentication.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/", _ensureAuthentication.ensureAuthenticated, listRentalByUserController.handle);
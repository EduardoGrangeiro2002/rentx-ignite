"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.carRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("@configs/upload"));

var _createCarController = require("@modules/cars/UseCases/createCar/createCarController");

var _CreateCarSpecificationController = require("@modules/cars/UseCases/createCarSpecification/CreateCarSpecificationController");

var _ListCarController = require("@modules/cars/UseCases/ListCar/ListCarController");

var _uploadCarImagesController = require("@modules/cars/UseCases/uploadCarImages/uploadCarImagesController");

var _ensureAdmin = _interopRequireDefault(require("../middlewares/ensureAdmin"));

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const carRoutes = (0, _express.Router)();
exports.carRoutes = carRoutes;
const createCarController = new _createCarController.CreateCarController();
const listCarController = new _ListCarController.ListCarController();
const createCarSpecificationController = new _CreateCarSpecificationController.CreateCarSpecificationControler();
const uploadImagesController = new _uploadCarImagesController.UploadImageController();
const upload = (0, _multer.default)(_upload.default);
carRoutes.post("/", _ensureAuthentication.ensureAuthenticated, _ensureAdmin.default, createCarController.handle);
carRoutes.get("/available", listCarController.handle);
carRoutes.post("/specification_cars/:id", _ensureAuthentication.ensureAuthenticated, _ensureAdmin.default, createCarSpecificationController.handle);
carRoutes.post("/images/:id", _ensureAuthentication.ensureAuthenticated, _ensureAdmin.default, upload.array("images"), uploadImagesController.handle);
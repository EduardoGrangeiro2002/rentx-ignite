"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRouter = void 0;

var _express = require("express");

var _CreateSpecificationController = require("@modules/cars/UseCases/CreateSpecification/CreateSpecificationController");

var _ListSpecificationController = require("@modules/cars/UseCases/ListSpecification/ListSpecificationController");

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

var _ensureAdmin = _interopRequireDefault(require("../middlewares/ensureAdmin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const specificationRouter = (0, _express.Router)();
exports.specificationRouter = specificationRouter;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
const listSpecificationController = new _ListSpecificationController.ListSpecificationController();
specificationRouter.use(_ensureAuthentication.ensureAuthenticated);
specificationRouter.post("/", _ensureAdmin.default, createSpecificationController.handle);
specificationRouter.get("/", listSpecificationController.handle);
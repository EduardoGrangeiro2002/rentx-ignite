"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.categoriesRoutes = void 0;

var _express = require("express");

var _multer = _interopRequireDefault(require("multer"));

var _CreateCategoryController = require("@modules/cars/UseCases/createCategory/CreateCategoryController");

var _ImportCategoryController = require("@modules/cars/UseCases/ImportCategory/ImportCategoryController");

var _ListCategoryController = require("@modules/cars/UseCases/ListCategory/ListCategoryController");

var _ensureAuthentication = require("../middlewares/ensureAuthentication");

var _ensureAdmin = _interopRequireDefault(require("../middlewares/ensureAdmin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)({
  dest: "./tmp"
});
const categoriesRoutes = (0, _express.Router)();
exports.categoriesRoutes = categoriesRoutes;
const createCategoryControler = new _CreateCategoryController.CreateCategoryController();
const importCategoryController = new _ImportCategoryController.ImportCategoryController();
const listCategoryController = new _ListCategoryController.ListCategoryController();
categoriesRoutes.post("/", _ensureAuthentication.ensureAuthenticated, _ensureAdmin.default, createCategoryControler.handle);
categoriesRoutes.post("/import", upload.single("file"), _ensureAuthentication.ensureAuthenticated, _ensureAdmin.default, importCategoryController.handle);
categoriesRoutes.get("/", listCategoryController.handle);
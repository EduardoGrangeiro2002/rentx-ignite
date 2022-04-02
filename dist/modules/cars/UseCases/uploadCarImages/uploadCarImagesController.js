"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadImageController = void 0;

var _tsyringe = require("tsyringe");

var _uploadCarImagesUseCase = require("./uploadCarImagesUseCase");

class UploadImageController {
  async handle(request, response) {
    const {
      id
    } = request.params;
    const images = request.files;
    const image_name = images.map(file => file.filename);

    const uploadImageUseCase = _tsyringe.container.resolve(_uploadCarImagesUseCase.UploadCarImagesUseCase);

    await uploadImageUseCase.execute({
      car_id: id,
      image_name
    });
    return response.status(201).send();
  }

}

exports.UploadImageController = UploadImageController;
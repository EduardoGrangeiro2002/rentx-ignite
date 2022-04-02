import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImagesUseCase } from "./uploadCarImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];
    const image_name = images.map((file) => file.filename);
    const uploadImageUseCase = container.resolve(UploadCarImagesUseCase);

    await uploadImageUseCase.execute({ car_id: id, image_name });
    return response.status(201).send();
  }
}

export { UploadImageController };

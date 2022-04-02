import { container } from "tsyringe";

import { S3StorageProvider } from "./implementation/AWSStorageProvider";
import { LocalStorageProvider } from "./implementation/S3StorageProvider";
import { IStorageProvider } from "./IStorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.Storages]
);

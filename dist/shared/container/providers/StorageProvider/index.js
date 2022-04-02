"use strict";

var _tsyringe = require("tsyringe");

var _AWSStorageProvider = require("./implementation/AWSStorageProvider");

var _S3StorageProvider = require("./implementation/S3StorageProvider");

const diskStorage = {
  local: _S3StorageProvider.LocalStorageProvider,
  s3: _AWSStorageProvider.S3StorageProvider
};

_tsyringe.container.registerSingleton("StorageProvider", diskStorage[process.env.Storages]);
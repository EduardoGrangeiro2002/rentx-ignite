"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateUserAvatarUseCase = void 0;

var _tsyringe = require("tsyringe");

var _IUserRepositories = require("@modules/accounts/repositories/IUserRepositories");

var _IStorageProvider = require("@shared/container/providers/StorageProvider/IStorageProvider");

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

let UpdateUserAvatarUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepositories")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IUserRepositories.IUserRepositories === "undefined" ? Object : _IUserRepositories.IUserRepositories, typeof _IStorageProvider.IStorageProvider === "undefined" ? Object : _IStorageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateUserAvatarUseCase {
  constructor(UserRepository, storageProvider) {
    this.UserRepository = UserRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    user_id,
    avatar_file
  }) {
    const user = await this.UserRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatar_file, "avatar");
    user.avatar = avatar_file;
    await this.UserRepository.create(user);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.UpdateUserAvatarUseCase = UpdateUserAvatarUseCase;
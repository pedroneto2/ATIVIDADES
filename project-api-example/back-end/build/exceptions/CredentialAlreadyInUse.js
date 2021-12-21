"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class CredentialAlreadyInUse extends Error {
  constructor(credential) {
    super();
    this.status = 400;
    this.message = `${credential} already in use!`;
  }

}

var _default = CredentialAlreadyInUse;
exports.default = _default;
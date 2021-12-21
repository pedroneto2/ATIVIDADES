class CredentialAlreadyInUse extends Error {
  constructor(credential) {
    super();
    this.status = 400;
    this.message = `${credential} already in use!`;
  }
}

export default CredentialAlreadyInUse;

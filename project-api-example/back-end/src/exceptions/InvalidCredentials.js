class InvalidCredentials extends Error{
  constructor() {
    super()
    this.status = 400;
    this.message = 'Invalid credentials!';
  }
}

export default InvalidCredentials;

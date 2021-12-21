class InvalidId extends Error {
  constructor() {
    super();
    this.message = 'Invalid ID';
    this.status = 400;
  }
}

export default InvalidId;

class InvalidFormatData extends Error {
  constructor() {
    super();
    this.status = 400;
    this.message = 'Invalid format data';
  }
}

export default InvalidFormatData;

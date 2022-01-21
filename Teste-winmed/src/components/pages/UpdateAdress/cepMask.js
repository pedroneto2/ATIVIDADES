const cepMask = (value) => {
  if (value) {
    return value.replace(/\D/g, '').replace(/(-\d{10})\d+?$/, '$1');
  }
  return '';
};

export default cepMask;

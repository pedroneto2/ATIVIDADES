import { Router } from 'express';

import InvalidFormatData from '../exceptions/InvalidFormatData';

const route = Router();

route.post('/', (req, resp, next) => {
  const { intervaloA = [], intervaloB = [] } = req.body;

  const invalidArray = !Array.isArray(intervaloA) || !Array.isArray(intervaloB);

  if (invalidArray) {
    return next(new InvalidFormatData());
  }

  console.log(req.body);

  const emptyArrays = !intervaloA.length || !intervaloB.length;

  const invalidNumbersFromA = intervaloA.some((element) => !+element || typeof +element !== 'number');
  const invalidNumbersFromB = intervaloB.some((element) => !+element || typeof +element !== 'number');

  const invalidNumbers = invalidNumbersFromA || invalidNumbersFromB;

  const notAnInterval = intervaloA.length > 2 || intervaloB.length > 2;

  if (emptyArrays || invalidNumbers || notAnInterval) {
    return next(new InvalidFormatData());
  }

  // order the arrays if it`s not
  intervaloA.sort((a, b) => a - b);
  intervaloB.sort((a, b) => a - b);

  //The lesser of A must be <= than the greater of B
  const condition01 = intervaloA[0] <= intervaloB[1];

  //The greater of A must be >= than the lesser of B
  const condition02 = intervaloA[1] >= intervaloB[0];

  const response = condition01 && condition02;

  return resp.status(200).send(response);
});

export default route;

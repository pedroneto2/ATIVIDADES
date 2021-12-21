import { Router } from 'express';

import InvalidFormatData from '../exceptions/InvalidFormatData';

const route = Router();

route.post('/', (req, resp, next) => {
  const { listas = '' } = req.body;

  const noLists = !listas.salaN || !listas.salaS;

  const invalidArrays = !Array.isArray(listas.salaN) || !Array.isArray(listas.salaS);

  if (noLists || invalidArrays) {
    return next(new InvalidFormatData());
  }

  listas.salaN.sort((a, b) => a - b);
  listas.salaS.sort();

  return resp.status(200).json({ listas });
});

export default route;

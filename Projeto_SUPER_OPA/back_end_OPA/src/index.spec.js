import app from './app';
import request from 'supertest';

// TESTE DA ROTA /ordenaLista ===============================

const randomNumbers = [
  {
    sent: [3, 6, 1, 8, 19, 6],
    response: [1, 3, 6, 6, 8, 19],
  },
  {
    sent: [5, 7, 9, 12, 5, 8],
    response: [5, 5, 7, 8, 9, 12],
  },
  {
    sent: [25, 2, 78, 94, 2, 1],
    response: [1, 2, 2, 25, 78, 94],
  },
];

const randomStrings = [
  {
    sent: ['a', 'f', 'o', 'z', 'k'],
    response: ['a', 'f', 'k', 'o', 'z'],
  },
  {
    sent: ['k', 'r', 'm', 'u'],
    response: ['k', 'm', 'r', 'u'],
  },
  {
    sent: ['xcfer', 'xuzvir', 'vuoi', 'ozue'],
    response: ['ozue', 'vuoi', 'xcfer', 'xuzvir'],
  },
];

const invalidData = [
  {},
  { listas: '' },
  { listas: { salaP: [], salaS: [] } },
  { listas: { salaN: [], salaS: {} } },
];

describe('Test route ordenaLista', () => {
  it('should return an object "listas" with properties "salaN" and "salaS"', async () => {
    const res = await request(app)
      .post('/ordenaLista')
      .send({
        listas: {
          salaN: [1, 5, 7, 8],
          salaS: ['a', 'x', 'n'],
        },
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('listas');
    expect(res.body.listas).toHaveProperty('salaN');
    expect(res.body.listas).toHaveProperty('salaS');
  });

  invalidData.forEach(async (data, index) => {
    it(`Should return status code 400 for invalid data #0${index + 1}`, async () => {
      const res = await request(app).post('/ordenaLista').send(data);
      expect(res.statusCode).toEqual(400);
    });
  });

  for (let test = 0; test < randomNumbers.length; test++) {
    const sentSalaN = [...randomNumbers[test].sent];
    const sentSalaS = [...randomStrings[test].sent];

    const respSalaN = [...randomNumbers[test].response];
    const respSalaS = [...randomStrings[test].response];

    const sentObject = { listas: { salaN: sentSalaN, salaS: sentSalaS } };
    const responseObject = { listas: { salaN: respSalaN, salaS: respSalaS } };

    it(`##TEST ${test + 1} - should return ordered lists`, async () => {
      const res = await request(app).post('/ordenaLista').send(sentObject);
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(responseObject);
    });
  }
});

// TESTE DA ROTA /interlace ===============================

const randomIntervals = [
  { sent: { A: [20, 40], B: [10, 19] }, response: false },
  { sent: { A: [20, 40], B: [10, 20] }, response: true },
  { sent: { A: [10, 20], B: [20, 30] }, response: true },
  { sent: { A: [10, 20], B: [40, 50] }, response: false },
];

const invalidData2 = [
  {},
  { intervaloA: 'teste', intervaloB: [] },
  { intervaloA: [1, 3], intervaloB: [1, 'x'] },
  { intervaloA: [1, 3, 5], intervaloB: [5, 8] },
];

describe('Test route interlace', () => {
  it('should return a boolean', async () => {
    const res = await request(app)
      .post('/interlace?')
      .send({
        intervaloA: [1, 2],
        intervaloB: [3, 5],
      });
    expect(res.statusCode).toEqual(200);
    expect(typeof res.body).toBe('boolean');
  });

  invalidData2.forEach((data, index) => {
    it(`Should return status code 400 for invalid data #0${index + 1}`, async () => {
      const res = await request(app).post('/interlace?').send(data);
      expect(res.statusCode).toEqual(400);
    });
  });

  for (let test = 0; test < randomIntervals.length; test++) {
    const sentIntervaloA = [...randomIntervals[test].sent.A];
    const sentIntervaloB = [...randomIntervals[test].sent.B];

    const response = randomIntervals[test].response;

    it(`##TEST ${test + 1} - should return ${response}`, async () => {
      const res = await request(app).post('/interlace?').send({
        intervaloA: sentIntervaloA,
        intervaloB: sentIntervaloB,
      });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toBe(response);
    });
  }
});

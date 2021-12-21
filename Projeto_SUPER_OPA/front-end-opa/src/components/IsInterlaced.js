import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import { isInterlaced } from 'api/api';

import intervalMask from 'masks/intervalMask';

const INITIAL_INTERVALS = {
  intervaloA: '',
  intervaloB: '',
};

const handleSubmitIntervals = async (
  e,
  { intervaloA, intervaloB },
  setIntervals,
  setInterlaced,
) => {
  e.preventDefault();
  if (!intervaloA || !intervaloB) return;
  const IntervaloA = intervaloA.split(',');
  const IntervaloB = intervaloB.split(',');
  const cookedForm = { intervaloA: IntervaloA, intervaloB: IntervaloB };
  const response = await isInterlaced(cookedForm);
  setInterlaced({ answear: response });
  setIntervals(INITIAL_INTERVALS);
};

const handleChangeIntervals = (e, intervals, setIntervals) => {
  const { name, value } = e.target;
  const maskedValue = intervalMask(value);
  setIntervals({ ...intervals, [name]: maskedValue });
};

function IsInterlaced() {
  const [interlaced, setInterlaced] = useState({ answear: 'none' });

  const [intervals, setIntervals] = useState(INITIAL_INTERVALS);

  return (
    <div className="ordena-lista-form-container m-auto mt-5 col-10 col-md-6">
      <h3 className="text-center">Interlaced Intervals?</h3>
      <Form onSubmit={(e) => handleSubmitIntervals(e, intervals, setIntervals, setInterlaced)}>
        <Form.Group className="mb-3" controlId="formBasicIntervaloA">
          <Form.Label>Intervalo A</Form.Label>
          <Form.Control
            name="intervaloA"
            type="text"
            placeholder="Ex: 1,5"
            value={intervals.intervaloA}
            onChange={(e) => handleChangeIntervals(e, intervals, setIntervals)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicIntervaloB">
          <Form.Label>Intervalo B</Form.Label>
          <Form.Control
            name="intervaloB"
            type="text"
            placeholder="Ex: 4,8"
            value={intervals.intervaloB}
            onChange={(e) => handleChangeIntervals(e, intervals, setIntervals)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Are intervals interlaced?
        </Button>
      </Form>
      {interlaced.answear !== 'none' && (
        <div
          className={`is-interlaced-answear my-5 fs-1 text-center ${
            interlaced.answear ? 'text-success' : 'text-danger'
          }`}
        >
          {interlaced.answear ? 'Yes' : 'No'}
        </div>
      )}
    </div>
  );
}

export default IsInterlaced;

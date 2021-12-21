import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';

import { orderLists } from 'api/api';

import salaNMask from 'masks/salaNMask';
import salaSMask from 'masks/salaSMask';

const INITIAL_LISTAS = {
  salaN: '',
  salaS: '',
};

const handleSubmitListas = async (e, { salaN, salaS }, setLists, setListas) => {
  e.preventDefault();
  if (!salaN || !salaS) return;
  const SalaN = salaN.split(',');
  const SalaS = salaS.split(',');
  const sentListas = { salaN: SalaN, salaS: SalaS };
  const cookedForm = { listas: sentListas };
  const { listas } = await orderLists(cookedForm);
  const sent = { ...sentListas };
  const received = { ...listas };
  setLists({ sent, received });
  setListas(INITIAL_LISTAS);
};

const handleChangeListas = (e, listas, setListas) => {
  const { name, value } = e.target;
  const mask = name === 'salaN' ? salaNMask : salaSMask;
  const maskedValue = mask(value);
  setListas({ ...listas, [name]: maskedValue });
};

function OrderLists() {
  const [lists, setLists] = useState({ sent: {}, received: {} });

  const [listas, setListas] = useState(INITIAL_LISTAS);

  return (
    <div className="ordena-lista-form-container m-auto mt-5 col-10 col-md-6">
      <h3 className="text-center">Order Lists</h3>
      <Form onSubmit={(e) => handleSubmitListas(e, listas, setLists, setListas)}>
        <Form.Group className="mb-3" controlId="formBasicSalaN">
          <Form.Label>Sala N</Form.Label>
          <Form.Control
            name="salaN"
            type="text"
            placeholder="Numbers separated with commas. Ex: 3,54,76,4"
            value={listas.salaN}
            onChange={(e) => handleChangeListas(e, listas, setListas)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSalaS">
          <Form.Label>Sala S</Form.Label>
          <Form.Control
            name="salaS"
            type="text"
            placeholder="Strings separated with commas. Ex: a,fork,d,y,cat"
            value={listas.salaS}
            onChange={(e) => handleChangeListas(e, listas, setListas)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Order Lists!
        </Button>
      </Form>
      {lists.sent.salaN && (
        <div className="ordena-lista-results my-5">
          <h4>Sent Lists:</h4>
          <p>SalaN: [{lists.sent.salaN.join(', ')}]</p>
          <p>SalaS: [{lists.sent.salaS.join(', ')}]</p>
          <h4 className="mt-4">Ordered Lists:</h4>
          <p>SalaN: [{lists.received.salaN.join(', ')}]</p>
          <p>SalaS: [{lists.received.salaS.join(', ')}]</p>
        </div>
      )}
    </div>
  );
}

export default OrderLists;

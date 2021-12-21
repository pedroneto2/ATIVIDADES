/* eslint-disable react/no-array-index-key */
/* eslint-disable no-unused-vars */
import 'components/templates/Calculator/Calculator.scss';
import { useEffect, useState } from 'react';

import { FloatingLabel, Form } from 'react-bootstrap';

const Calculator = ({ planTable }) => {
  const { originDestinyPrice, times, planPriceTime } = planTable;

  const originOptions = [];

  originDestinyPrice.forEach((item) => {
    if (!originOptions.includes(item[0])) {
      originOptions.push(item[0]);
    }
  });

  const [destinyOptions, setDestinyOptions] = useState([]);

  const [priceTimePlan, setPriceTimePlan] = useState('0,0');
  const [price, setPrice] = useState('');
  const [total, setTotal] = useState(0);

  const [origin, setOrigin] = useState('');
  const [destiny, setDestiny] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    const newDestinyOptions = [];
    originDestinyPrice.forEach((item, index) => {
      if (originDestinyPrice[index][0] === origin) {
        newDestinyOptions.push(item[1]);
      }
    });
    setDestinyOptions(newDestinyOptions);
    setPrice('');
  }, [origin]);

  useEffect(() => {
    let newPrice = '';
    originDestinyPrice.find((item) => {
      if (item[0] === origin && item[1] === destiny) {
        newPrice = item[2].toFixed(2);
        return true;
      }
      return false;
    });
    setPrice(newPrice);
  }, [destiny]);

  useEffect(() => {
    const priceAndTime = priceTimePlan.split(',');
    const timeSubtraction = (time || 0) - priceAndTime[1];
    const restTime = timeSubtraction < 0 ? 0 : timeSubtraction;
    const newTotal = +priceAndTime[0] + (price || 0) * restTime;
    setTotal(newTotal);
  }, [priceTimePlan, price, time]);

  return (
    <div className="calculator-container">
      <div className="first-sections-row d-flex">
        <FloatingLabel
          className="floating-label first-floating-label"
          controlId="floatingSelect"
          label="ORIGEM"
        >
          <Form.Select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="select first-select"
            aria-label="Floating label select example"
          >
            <option hidden>Escolher origem</option>
            {originOptions.map((option, index) => (
              <option key={index + 1} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          className="floating-label second-floating-label"
          controlId="floatingSelect"
          label="DESTINO"
        >
          <Form.Select
            disabled={!origin}
            value={destiny}
            onChange={(e) => setDestiny(e.target.value)}
            className="select second-select"
            aria-label="Floating label select example"
          >
            <option hidden>Escolher destino</option>
            {destinyOptions.map((option, index) => (
              <option key={index + 1} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          className="floating-label third-floating-label"
          controlId="floatingSelect"
          label="TEMPO"
        >
          <Form.Select
            disabled={!destiny}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="select third-select"
            aria-label="Floating label select example"
          >
            <option hidden>Escolher tempo</option>
            {times.map((option, index) => (
              <option key={index + 1} value={option}>
                {option}
              </option>
            ))}
          </Form.Select>
        </FloatingLabel>
      </div>
      <FloatingLabel
        className="floating-label fourth-floating-label"
        controlId="floatingSelect"
        label="PLANO"
      >
        <Form.Select
          disabled={!time}
          value={priceTimePlan}
          onChange={(e) => setPriceTimePlan(e.target.value)}
          className="select fourth-select"
          aria-label="Floating label select example"
        >
          <option value={0} hidden>
            Escolher o plano
          </option>
          {planPriceTime.map((option, index) => (
            <option key={index + 1} value={`${option[1]},${option[2]}`}>
              {option[0]}
            </option>
          ))}
        </Form.Select>
      </FloatingLabel>
      <div className="results-container d-flex justify-content-between align-items-center pt-3 px-3">
        <p>Total</p>
        <p>{`R$ ${total.toLocaleString('pt-br', { minimumFractionDigits: 2 })}`}</p>
      </div>
    </div>
  );
};

export default Calculator;

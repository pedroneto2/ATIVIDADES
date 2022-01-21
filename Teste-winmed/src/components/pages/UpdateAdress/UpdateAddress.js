/* eslint-disable no-unused-vars */
import 'components/pages/UpdateAdress/UpdateAdress.scss';
import { useState } from 'react';
import axios from 'axios';

import cepMask from './cepMask';

const handleSubmit = (e) => {
  e.preventDefault();
  const confirmation = window.confirm('Você tem certeza de que deseja alterar o endereço?');
  if (!confirmation) return;
  console.log('alterar endereço');
  window.alert('Endereço alterado com sucesso!');
};

const retrieveAddress = async (cep, values, setValues) => {
  const API = `https://viacep.com.br/ws/${cep}/json`;
  try {
    const { data } = await axios.get(API);
    const { logradouro, complemento, bairro, localidade, uf } = data;
    const newCity = localidade && uf ? `${localidade} - ${uf}` : '';
    let newAddress = logradouro || '';
    if (complemento) newAddress += `, ${complemento}`;
    if (bairro) newAddress += `, bairro ${bairro}`;
    setValues({ ...values, city: newCity, address: newAddress });
  } catch (error) {
    window.alert('CEP não encontrado!');
  }
};

const UpdateAddress = ({ theme }) => {
  const [values, setValues] = useState({
    cep: '',
    address: '',
    city: '',
    number: '',
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    let newValue = value;
    if (name === 'cep') newValue = cepMask(value);
    setValues({ ...values, [name]: newValue });
  };

  return (
    <div className="update-address-container">
      <p className="upate-address-text ms-3" style={{ color: `${theme === 'dark' && '#3e447e'}` }}>
        Atualizar Endereço da Clínica
      </p>
      <div
        className={`form-container shadow p-3 mb-4 rounded w-100 ${
          theme === 'light' ? 'bg-light' : 'bg-secondary'
        }`}
      >
        <form onSubmit={(e) => handleSubmit(e)} className="d-flex flex-column">
          <div className="inputs-container d-flex flex-wrap">
            <div className="input-container me-4 mb-3">
              <label htmlFor="InputCEP" className="form-label">
                CEP
                <input
                  onBlur={() => retrieveAddress(values.cep, values, setValues)}
                  onChange={handleChange}
                  value={values.cep}
                  placeholder="Ex: 12345000"
                  name="cep"
                  type="text"
                  className="form-control"
                  id="InputCEP"
                  style={{
                    backgroundColor: `${theme === 'light' ? '#ffff' : '#36364e'}`,
                    color: `${theme === 'light' ? '#36364e' : '#c8c8c8'}`,
                  }}
                />
              </label>
            </div>
            <div className="input-container me-4 mb-3">
              <label htmlFor="InputAddress" className="form-label">
                ENDEREÇO
                <input
                  onChange={handleChange}
                  value={values.address}
                  placeholder="Preenchido automaticamente"
                  name="address"
                  type="text"
                  className="form-control"
                  id="InputAddress"
                  style={{
                    backgroundColor: `${theme === 'light' ? '#ffff' : '#36364e'}`,
                    color: `${theme === 'light' ? '#36364e' : '#c8c8c8'}`,
                  }}
                />
              </label>
            </div>
            <div className="input-container me-4 mb-3">
              <label htmlFor="InputCity" className="form-label">
                Cidade
                <input
                  onChange={handleChange}
                  value={values.city}
                  disabled
                  placeholder="Preenchido automaticamente"
                  name="city"
                  type="text"
                  className="form-control"
                  id="InputCity"
                  style={{
                    backgroundColor: `${theme === 'light' ? '#ffff' : '#36364e'}`,
                    color: `${theme === 'light' ? '#36364e' : '#c8c8c8'}`,
                  }}
                />
              </label>
            </div>
            <div className="input-container me-4 mb-3">
              <label htmlFor="InputNumber" className="form-label">
                Número
                <input
                  onChange={handleChange}
                  value={values.number}
                  name="number"
                  type="text"
                  className="form-control"
                  id="InputNumber"
                  style={{
                    backgroundColor: `${theme === 'light' ? '#ffff' : '#36364e'}`,
                    color: `${theme === 'light' ? '#36364e' : '#c8c8c8'}`,
                  }}
                />
              </label>
            </div>
          </div>
          <button type="submit" className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-dark'}`}>
            Alterar endereço
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddress;

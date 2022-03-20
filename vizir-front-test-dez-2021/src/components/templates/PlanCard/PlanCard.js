/* eslint-disable react/no-array-index-key */
import 'components/templates/PlanCard/PlanCard.scss';

import ShowPrice from 'components/templates/ShowPrice/ShowPrice';

import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const PlanCard = ({
  children,
  plan,
  price = 0,
  custom,
  buttonText,
  buttonLink = '/#',
  features,
}) => {
  const navigate = useNavigate();

  return (
    <div className="plan-card-container border rounded rounded-3 d-flex flex-column align-items-center mx-auto">
      <div className="logo-container mt-4">
        {children}
        <p className="fw-bold mt-3 mb-0 fs-6">{plan}</p>
      </div>
      <div className="price-container mx-auto mt-1 mb-1">
        {custom ? (
          <p className="fw-bold fs-5 text-center mx-auto mt-2 mb-1">
            Customize o plano do seu jeito!
          </p>
        ) : (
          <div className="w-75 mx-auto mt-0">
            <ShowPrice price={price} size={40} />
          </div>
        )}
      </div>
      <p className="fs-6 text-center w-75 px-4 mb-1">For organizing every corner of your life.</p>
      <div className="plan-features-container">
        <p className="fw-bold fs-6 text-center mb-0">Everything in Personal, plus</p>
        {features.map((feature, index) => (
          <p key={index} className="fs-6 text-center text-secondary my-0">
            <i
              className={`bi bi-${feature[0] ? 'check' : 'x'} fs-4`}
              style={{ color: feature[0] ? 'green' : 'red' }}
            />
            {feature[1]}
          </p>
        ))}
      </div>
      <Button
        onClick={() => navigate(buttonLink)}
        variant="outline-primary rounded rounded-3 fw-bold px-4 my-4"
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default PlanCard;

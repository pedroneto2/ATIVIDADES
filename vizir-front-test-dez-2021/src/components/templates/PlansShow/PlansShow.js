import 'components/templates/PlansShow/PlansShow.scss';

import PlanCard from 'components/templates/PlanCard/PlanCard';

import logo1 from 'images/blob1.png';
import logo2 from 'images/blob2.png';
import logo3 from 'images/blob3.png';
import logo4 from 'images/blob4.png';

const PlansShow = () => (
  <section className="plans-show-container d-flex flex-column align-items-center mt-4 mt-sm-5">
    <div className="plans-text-container mx-auto">
      <h3>Planos</h3>
      <p>
        Excepteur sint occaecat cupidatatnon proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.
      </p>
    </div>
    <div className="plans-card-container container-fluid">
      <div className="row row-cols-1 row-cols-md-2 row-cols-xxl-4">
        <div className="col mt-3">
          <PlanCard
            plan="FaleMais 30"
            buttonText="Contratar"
            features={[
              [1, 'Unlimited file uploads'], // 1 - check icon OR 0 - close icon
              [1, 'Unlimited file uploads'],
              [1, 'Unlimited file uploads'],
            ]}
          >
            <img src={logo1} alt="fale mais 30" />
          </PlanCard>
        </div>
        <div className="col mt-3">
          <PlanCard
            plan="FaleMais 30"
            buttonText="Contratar"
            features={[
              [1, 'Unlimited file uploads'], // 1 - check icon OR 0 - close icon
              [1, 'Unlimited file uploads'],
              [1, 'Unlimited file uploads'],
            ]}
          >
            <img src={logo2} alt="fale mais 30" />
          </PlanCard>
        </div>
        <div className="col mt-3">
          <PlanCard
            plan="FaleMais 30"
            buttonText="Contratar"
            features={[
              [1, 'Unlimited file uploads'], // 1 - check icon OR 0 - close icon
              [1, 'Unlimited file uploads'],
              [1, 'Unlimited file uploads'],
            ]}
          >
            <img src={logo3} alt="fale mais 30" />
          </PlanCard>
        </div>
        <div className="col mt-3">
          <PlanCard
            plan="FaleMais 30"
            custom
            buttonText="Customizar"
            features={[
              [1, 'Unlimited file uploads'], // 1 - check icon OR 0 - close icon
              [1, 'Unlimited file uploads'],
              [1, 'Unlimited file uploads'],
            ]}
          >
            <img src={logo4} alt="fale mais 30" />
          </PlanCard>
        </div>
      </div>
    </div>
  </section>
);

export default PlansShow;

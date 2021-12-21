import 'components/templates/AdvantagesSection/AdvantagesSection.scss';

import AdvantageFeature from 'components/templates/AdvantageFeature/AdvantageFeature';
import ShowPrice from 'components/templates/ShowPrice/ShowPrice';
import TableComponent from 'components/templates/TableComponent/TableComponent';

import devices from 'images/devices.png';

import mapPin from 'images/map-pin.png';
import plus from 'images/plus.png';
import phone from 'images/phone-call.png';

const AdvantagesSection = () => (
  <section className="advantage-section-container d-flex flex-column flex-md-row align-items-start justify-content-between align-items-md-start mt-3 mt-md-5">
    <h3>Vantagens do FaleMais</h3>
    <div className="advantages-content-container">
      <AdvantageFeature
        title="Lorem ipsum dolor sit amet"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      >
        <img className="ms-sl-5" src={devices} alt="devices" />
      </AdvantageFeature>
      <hr />
      <AdvantageFeature
        title="Duis aute irure dolor in reprehenderit"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      >
        <div className="feature-media-container me-sl-5 d-flex justify-content-between align-items-center">
          <div className="icons-container d-flex justify-content-between">
            <div className="map-pin-container">
              <img src={mapPin} alt="map" />
              <p className="fs-6 mt-2 text-secondary">Lorem</p>
            </div>
            <div className="plus-container">
              <img src={plus} alt="plus" />
            </div>
            <div className="phone-container">
              <img src={phone} alt="phone-call" />
              <p className="fs-6 mt-2 text-secondary">Ipsum</p>
            </div>
          </div>
          <div className="price-container">
            <ShowPrice size={56} textColor="#AB49CE" />
          </div>
        </div>
      </AdvantageFeature>
      <hr />
      <AdvantageFeature
        title="Excepteur sint occa ecat cupidatat"
        description="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      >
        <div className="mt-sl-5">
          <TableComponent
            tableContent={[
              ['Origem', 'Destino', '$/min'],
              ['011', '016', '1.90'],
              ['016', '011', '2.90'],
              ['011', '017', '1.70'],
              ['017', '011', '2.70'],
            ]}
          />
        </div>
      </AdvantageFeature>
    </div>
  </section>
);

export default AdvantagesSection;

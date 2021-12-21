import 'components/templates/PlanCalculation/PlanCalculation.scss';

import Calculator from '../Calculator/Calculator';

const PlanCalculation = () => (
  <section className="plan-calculation-container d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 mt-md-6">
    <div className="text-container text-center text-md-start mb-3 mb-md-0">
      <h3>Faça o cálculo do FaleMais</h3>
      <p>
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum.
      </p>
    </div>
    <div className="calculator-container mx-auto me-md-6">
      <Calculator
        planTable={{
          originDestinyPrice: [
            ['011', '016', 1.9],
            ['016', '011', 2.9],
            ['011', '017', 1.7],
            ['017', '011', 2.7],
            ['011', '018', 0.9],
            ['018', '011', 1.9],
          ],
          times: [20, 80, 100, 200],
          planPriceTime: [
            ['Sem FaleMais', [0, 0]],
            ['FaleMais30', [0, 30]],
            ['FaleMais60', [0, 60]],
            ['FaleMais120', [0, 120]],
          ],
        }}
      />
    </div>
  </section>
);

export default PlanCalculation;

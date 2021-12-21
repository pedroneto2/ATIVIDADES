import Header from 'components/templates/Header/Header';
import AdvantagesSection from 'components/templates/AdvantagesSection/AdvantagesSection';
import PlanCalculation from 'components/templates/PlanCalculation/PlanCalculation';
import PlansShow from 'components/templates/PlansShow/PlansShow';
import Footer from 'components/templates/Footer/Footer';

const Home = () => (
  <div className="home-container">
    <Header />
    <AdvantagesSection />
    <PlanCalculation />
    <PlansShow />
    <Footer />
  </div>
);

export default Home;

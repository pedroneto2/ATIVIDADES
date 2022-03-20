import 'components/templates/AdvantageFeature/AdvantageFeature.scss';

const AdvantageFeature = ({ children, title, description }) => (
  <article className="advantage-feature-container d-flex flex-wrap justify-content-between align-items-center">
    <div className="feature-text-container text-start">
      <h4>{title}</h4>
      <p className="text-secondary">{description}</p>
    </div>
    <div className="feature-content-container my-4 mx-auto my-sl-0">{children}</div>
  </article>
);

export default AdvantageFeature;

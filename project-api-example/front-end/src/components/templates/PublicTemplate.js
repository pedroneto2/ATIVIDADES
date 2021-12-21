import './PublicTemplate.css';

const PublicTemplate = ({ children }) => (
  <div className="public-page-container row">
    <div className="image col-0 col-sm-6 col-lg-8" />
    <div className="content col-12 col-sm-6 col-lg-4">{children}</div>
  </div>
);

export default PublicTemplate;

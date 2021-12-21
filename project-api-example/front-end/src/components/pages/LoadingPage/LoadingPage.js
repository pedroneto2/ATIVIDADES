import './LoadingPage.css';
import { Spinner } from 'react-bootstrap';

const LoadingPage = () => (
  <div className="loading-page-container">
    <Spinner animation="border" variant="dark" />
  </div>
);

export default LoadingPage;

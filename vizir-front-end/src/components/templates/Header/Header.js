import 'components/templates/Header/Header.scss';

import logo from 'images/logo.png';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Header = () => (
  <header className="header-container">
    <div className="background-overlay">
      <nav className="navbar-container d-flex justify-content-between pt-2 pt-md-5">
        <img src={logo} className="ms-2 ms-md-5" alt="company logo" />
        <div className="navbar-links-container me-4 me-md-6">
          <Link to="/#">Vantagens</Link>
          <Link className="ms-2 ms-md-5" to="/#">
            Cálculo
          </Link>
          <Link className="ms-2 ms-md-5" to="/#">
            <Button variant="primary rounded rounded-3">Contratar</Button>
          </Link>
        </div>
      </nav>
      <div className="header-content-container mt-5">
        <h2>
          Pague menos,
          <b> Fale Mais</b>
        </h2>
        <p className="py-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
        <Link to="/#">
          <Button variant="outline-primary rounded rounded-3 fw-bold">Saiba mais</Button>
        </Link>
      </div>
    </div>
  </header>
);

export default Header;

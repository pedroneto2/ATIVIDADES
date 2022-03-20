/* eslint-disable function-paren-newline */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable implicit-arrow-linebreak */
import 'components/templates/Footer/Footer.scss';

import logo from 'images/logo.png';
import { Link } from 'react-router-dom';

const links = [
  [
    { text: 'Combo', link: '/#' },
    { text: 'Planos', link: '/#' },
    { text: 'Atendimentos', link: '/#' },
    { text: 'Serviços adicionais', link: '/#' },
  ],
  [
    { text: 'Celular', link: '/#' },
    { text: 'Planos', link: '/#' },
    { text: 'Atendimentos', link: '/#' },
    { text: 'Serviços adicionais', link: '/#' },
  ],
  [
    { text: 'Fixo', link: '/#' },
    { text: 'Planos', link: '/#' },
    { text: 'Atendimentos', link: '/#' },
    { text: 'Serviços adicionais', link: '/#' },
  ],
  [
    { text: 'Sobre', link: '/#' },
    { text: 'Planos', link: '/#' },
    { text: 'Atendimentos', link: '/#' },
    { text: 'Serviços adicionais', link: '/#' },
  ],
  [
    { text: 'Comunidade', link: '/#' },
    { text: 'Planos', link: '/#' },
    { text: 'Atendimentos', link: '/#' },
    { text: 'Serviços adicionais', link: '/#' },
  ],
];

const Footer = () => (
  <footer className="footer-container mt-5">
    <div className="links-container pt-5 mx-auto text-center">
      <div className="container mb-3">
        <div className="row row-cols-2 row-cols-sm-3 row-cols-lg-5 justify-content-center justify-content-sl-between">
          {links.map((column, index) => (
            <div key={index} className="col text-start mt-2 mt-md-0">
              <div className="column-content d-flex flex-column">
                {column.map((row, index2) => (
                  <Link
                    key={index2}
                    className={`${
                      index2 === 0 ? 'first fw-bold mb-md-2' : 'middle my-1'
                    } text-dark`}
                    to={row.link}
                  >
                    {row.text}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <hr className="mx-auto mx-xl-5" />
    </div>
    <div className="logo-container py-4 d-flex justify-content-center align-items-center">
      <img src={logo} alt="telzir" />
      <p className="my-auto ms-3">2021</p>
    </div>
  </footer>
);

export default Footer;

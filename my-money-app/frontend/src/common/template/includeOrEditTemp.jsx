import React from "react";
import ListingCredits from "../../my-money/listingCredits";
import ListingDebts from "../../my-money/listingDebts";

export default (props) => (
  <form>
    <section className="content">
      <div className="container-fluid">
        <div className="col-12">
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className="form-group">
                <label htmlFor="Nome">Nome</label>
                <input
                  type="text"
                  className="form-control"
                  id="Nome"
                  placeholder="Nome do registro"
                  value={props.name}
                  onChange={(e) => props.nameChange(e)}
                  readOnly={props.editMode}
                />
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <div className="form-group">
                <label htmlFor="Mes">Mes</label>
                <input
                  type="number"
                  className="form-control"
                  id="Mes"
                  placeholder="Mes de referencia"
                  min="1"
                  max="12"
                  value={props.month}
                  onChange={(e) => props.monthChange(e)}
                  readOnly={props.editMode}
                />
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <div className="form-group">
                <label htmlFor="Ano">Ano</label>
                <input
                  type="number"
                  className="form-control"
                  id="Ano"
                  placeholder="Ano de referencia"
                  min="1950"
                  max="2100"
                  value={props.year}
                  onChange={(e) => props.yearChange(e)}
                  readOnly={props.editMode}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 col-12">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>
                    {props.totalCreditsYear.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h3>
                  <p>Total de Creditos</p>
                </div>
                <div className="icon">
                  <i className="ion ion-cash" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>
                    {props.totalDebitsYear.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                    <sup style={{ fontSize: 20 }}></sup>
                  </h3>
                  <p>Total de Debitos</p>
                </div>
                <div className="icon">
                  <i className="ion ion-card" />
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-12">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>
                    {props.consolidedValueYear.toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </h3>
                  <p>Valor Consolidado</p>
                </div>
                <div className="icon">
                  <i className="ion ion-social-usd" />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-5 table-responsive">
              <h3>Creditos</h3>
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  <ListingCredits />
                </tbody>
              </table>
            </div>

            <div className="col-7 table-responsive">
              <h3>Debitos</h3>
              <table className="table table-hover text-nowrap">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  <ListingDebts />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div className="card-footer">
      <button
        type="submit"
        className="btn btn-primary"
        onClick={props.includeOrEdit}
      >
        {props.editMode ? "Alterar" : "Incluir"}
      </button>
    </div>
  </form>
);

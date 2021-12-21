import React from "react";

export default (props) => (
  <div className="content-wrapper">
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
          </div>
        </div>
      </div>
    </div>

    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-9">
            <div className="small-box bg-success">
              <div className="inner">
                <h3>
                  {props.totalCreditos.toLocaleString("pt-br", {
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

          <div className="col-lg-4 col-9">
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>
                  {props.totalDebitos.toLocaleString("pt-br", {
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

          <div className="col-lg-4 col-9">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>
                  {props.valorConsolidado.toLocaleString("pt-br", {
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
      </div>
    </section>
  </div>
);

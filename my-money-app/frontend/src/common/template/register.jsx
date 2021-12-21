import React from "react";
import Listing from "../../my-money/listing";
import IncludeOrEdit from "../../my-money/includeOrEdit";
import HideTab from "./hideTab";

export default (props) => (
  <div className="content-wrapper">
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <section className="col-lg-12 connectedSortable">
            <div className="card">
              <div className="card-header">
                <div className="card-tools">
                  <ul className="nav nav-pills ml-auto">
                    <HideTab hide={props.editTab.hide}>
                      <li className="nav-item">
                        <a
                          className={`nav-link ${props.editTab.listActive}`}
                          href="#listing"
                          data-toggle="tab"
                        >
                          <i className="fas fa-list"></i> Listar
                        </a>
                      </li>
                    </HideTab>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${props.editTab.includeOrEditActive}`}
                        href="#includeOrEdit"
                        data-toggle="tab"
                      >
                        {props.editTab.lastTab}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card-body">
                <div className="tab-content p-0">
                  <HideTab hide={props.editTab.hide}>
                    <div
                      className={`chart tab-pane ${props.editTab.listActive}`}
                      id="listing"
                      style={{ position: "relative" }}
                    >
                      <div className="row">
                        <div className="col-12 table-responsive">
                          <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Nome</th>
                                <th>Mes</th>
                                <th>Ano</th>
                                <th>Acoes</th>
                              </tr>
                            </thead>
                            <tbody>
                              <Listing />
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </HideTab>
                  <div
                    className={`chart tab-pane ${props.editTab.includeOrEditActive}`}
                    id="includeOrEdit"
                    style={{ position: "relative" }}
                  >
                    <IncludeOrEdit editMode={props.editTab.hide} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  </div>
);

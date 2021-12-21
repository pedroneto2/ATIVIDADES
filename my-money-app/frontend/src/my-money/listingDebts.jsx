import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addDebt,
  copyDebt,
  deleteDebt,
  changeDebtName,
  changeDebtValue,
  changeDebtStatus,
} from "./actions";

export default () => {
  const state = useSelector((state) => state.billingCycles);
  const dispatch = useDispatch();

  const list = state.debts || [];

  return list.map((obj) => {
    const index = state.debts.indexOf(obj);
    return (
      <tr key={obj._id}>
        <td>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="debtName"
              placeholder="Origem do debto"
              value={state.debts[index].name}
              onChange={(e) => dispatch(changeDebtName(e, index))}
            />
          </div>
        </td>
        <td>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="debtValue"
              placeholder="Valor do debto"
              value={state.debts[index].value}
              onChange={(e) => dispatch(changeDebtValue(e, index))}
            />
          </div>
        </td>
        <td>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="debtsStatus"
              placeholder="Status do debto"
              value={state.debts[index].status}
              onChange={(e) => dispatch(changeDebtStatus(e, index))}
            />
          </div>
        </td>
        <td>
          <button
            className={`btn btn-success`}
            onClick={() => dispatch(addDebt(index))}
          >
            <i className={`fas fa-plus`}></i>
          </button>
          <button
            className={`btn btn-warning`}
            onClick={() => dispatch(copyDebt(obj, index))}
          >
            <i className={`fas fa-copy`}></i>
          </button>
          <button
            className={`btn btn-danger`}
            onClick={() => dispatch(deleteDebt(index))}
          >
            <i className={`fa fa-trash-alt`}></i>
          </button>
        </td>
      </tr>
    );
  });
};

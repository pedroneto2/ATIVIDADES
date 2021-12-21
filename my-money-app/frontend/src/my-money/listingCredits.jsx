import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addCredit,
  copyCredit,
  deleteCredit,
  changeCreditName,
  changeCreditValue,
} from "./actions";

export default () => {
  const state = useSelector((state) => state.billingCycles);
  const dispatch = useDispatch();

  const list = state.credits || [];

  return list.map((obj) => {
    const index = state.credits.indexOf(obj);

    return (
      <tr key={obj._id}>
        <td>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="creditName"
              placeholder="Origem do credito"
              value={obj.name}
              onChange={(e) => dispatch(changeCreditName(e, index))}
            />
          </div>
        </td>
        <td>
          <div className="form-group">
            <input
              type="number"
              className="form-control"
              id="creditValue"
              placeholder="Valor do credito"
              value={obj.value}
              onChange={(e) => dispatch(changeCreditValue(e, index))}
            />
          </div>
        </td>
        <td>
          <button
            className={`btn btn-success`}
            onClick={() => dispatch(addCredit(index))}
          >
            <i className={`fas fa-plus`}></i>
          </button>
          <button
            className={`btn btn-warning`}
            onClick={() => dispatch(copyCredit(obj, index))}
          >
            <i className={`fas fa-copy`}></i>
          </button>
          <button
            className={`btn btn-danger`}
            onClick={() => dispatch(deleteCredit(index))}
          >
            <i className={`fa fa-trash-alt`}></i>
          </button>
        </td>
      </tr>
    );
  });
};

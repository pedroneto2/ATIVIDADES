import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeData, retrieveList, editData } from "./actions";

export default function listing() {
  const state = useSelector((state) => state.billingCycles);

  const dispatch = useDispatch();

  useEffect(() => dispatch(retrieveList()), []);

  const list = state.list || [];

  return list.map((obj) => (
    <tr key={obj._id}>
      <td>{obj.name}</td>
      <td>{obj.month}</td>
      <td>{obj.year}</td>
      <td>
        <button
          className={`btn btn-warning`}
          onClick={() => dispatch(editData(obj))}
        >
          <i className={`fa fa-pen`}></i>
        </button>
        <span> </span>
        <button
          className={`btn btn-danger`}
          onClick={() => dispatch(dispatch(removeData(obj._id)))}
        >
          <i className={`fa fa-trash-alt`}></i>
        </button>
      </td>
    </tr>
  ));
}

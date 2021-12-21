import React, { useEffect } from "react";
import IncludeOrEditTemp from "../common/template/includeOrEditTemp";
import { useSelector, useDispatch } from "react-redux";
import { changeData, includeData } from "./actions";

export default function includeOrEdit() {
  const state = useSelector((state) => state.billingCycles);
  const dispatch = useDispatch();

  function countMoney(objectList) {
    let sum = 0;
    objectList.forEach((item) => {
      sum += +item.value;
    });
    return sum;
  }

  const credits = state.credits ? countMoney(state.credits) : 0;
  const debts = state.debts ? countMoney(state.debts) : 0;
  const edit = state.edit;

  useEffect(() => {
    //VERIFICA SE O ARRAY DE CREDITOS ESTA VAZIO E SE ESTIVER ADICIONA CAMPOS
    if (!state.credits[0]) {
      state.credits.push({ name: "", value: "" });
      state.debts.push({ name: "", value: "", status: "" });
    }
  }, []);

  return (
    <IncludeOrEditTemp
      editMode={edit}
      name={state.name}
      nameChange={(e) =>
        dispatch({ type: "CHANGE_NAME", payLoad: e.target.value })
      }
      month={state.month}
      monthChange={(e) =>
        dispatch({ type: "CHANGE_MONTH", payLoad: e.target.value })
      }
      year={state.year}
      yearChange={(e) =>
        dispatch({ type: "CHANGE_YEAR", payLoad: e.target.value })
      }
      totalCreditsYear={+credits}
      totalDebitsYear={+debts}
      consolidedValueYear={credits - debts}
      includeOrEdit={
        edit
          ? () => dispatch(changeData(state))
          : () => dispatch(includeData(state))
      }
    />
  );
}

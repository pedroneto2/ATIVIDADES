import axios from "axios";

const URL = "http://localhost:3003/api/billingCycles";

export function retrieveList() {
  const request = axios.get(`${URL}?sort=-createdAt`);
  return (dispatch) => {
    return request.then((resp) =>
      dispatch({ type: "RETRIEVE_LIST", payLoad: resp.data })
    );
  };
}

export function changeCreditName(e, index) {
  return { type: "CHANGE_CREDIT_NAME", payLoad: e.target.value, index: index };
}

export function changeCreditValue(e, index) {
  return { type: "CHANGE_CREDIT_VALUE", payLoad: e.target.value, index: index };
}

export function changeDebtName(e, index) {
  return { type: "CHANGE_DEBT_NAME", payLoad: e.target.value, index: index };
}

export function changeDebtValue(e, index) {
  return { type: "CHANGE_DEBT_VALUE", payLoad: e.target.value, index: index };
}

export function changeDebtStatus(e, index) {
  return { type: "CHANGE_DEBT_STATUS", payLoad: e.target.value, index: index };
}

export function addCredit(index) {
  return { type: "ADD_CREDIT", index: index };
}

export function copyCredit(obj, index) {
  return { type: "COPY_CREDIT", payLoad: obj, index: index };
}

export function deleteCredit(index) {
  return { type: "DELETE_CREDIT", index: index };
}

export function addDebt(index) {
  return { type: "ADD_DEBT", index: index };
}

export function copyDebt(obj, index) {
  return { type: "COPY_DEBT", payLoad: obj, index: index };
}

export function deleteDebt(index) {
  return { type: "DELETE_DEBT", index: index };
}

export function includeData(includedData) {
  delete includedData.list;
  delete includedData.edit;
  delete includedData._id;
  const request = axios.post(URL, includedData);
  return (dispatch) => {
    request
      .then((resp) =>
        dispatch([
          { type: "REFRESH" },
          window.alert("Operacao realizada com sucesso!"),
          retrieveList(),
        ])
      )
      .catch((error) => {
        let errorMensagem = "OS SEGUINTES ERROS FORAM ENCONTRADOS:\n";
        error.response.data.errors.forEach(
          (error) => (errorMensagem += "-" + error + "\n")
        );
        return window.alert(errorMensagem);
      });
  };
}

export function removeData(id) {
  const request = axios.delete(`${URL}/${id}`);
  return (dispatch) => {
    request.then((resp) => dispatch(retrieveList()));
  };
}

export function editData(editedData) {
  return [{ type: "EDIT_DATA", payLoad: editedData }, retrieveList()];
}

export function changeData(changedData) {
  const id = changedData._id;
  delete changedData.list;
  delete changedData.edit;
  delete changedData._id;
  const request = axios.put(`${URL}/${id}`, changedData);
  return (dispatch) => {
    request
      .then((resp) =>
        dispatch([
          { type: "REFRESH" },
          window.alert("Operacao realizada com sucesso!"),
          retrieveList(),
        ])
      )
      .catch((error) => {
        let errorMensagem = "OS SEGUINTES ERROS FORAM ENCONTRADOS:\n";
        error.response.data.errors.forEach(
          (error) => (errorMensagem += "-" + error + "\n")
        );
        return window.alert(errorMensagem);
      });
  };
}

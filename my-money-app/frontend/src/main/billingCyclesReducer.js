import update from "immutability-helper";

const INITIAL_STATE = {
  list: [],
  edit: false,
  _id: "",
  name: "",
  month: "",
  year: "",
  debts: [],
  credits: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "RETRIEVE_LIST":
      return { ...state, list: action.payLoad };
      break;
    case "CHANGE_NAME":
      return { ...state, name: action.payLoad };
      break;
    case "CHANGE_MONTH":
      return { ...state, month: +action.payLoad };
      break;
    case "CHANGE_YEAR":
      return { ...state, year: +action.payLoad };
      break;
    case "CHANGE_CREDIT_NAME":
      return update(state, {
        credits: { [action.index]: { name: { $set: action.payLoad } } },
      });
      break;
    case "CHANGE_CREDIT_VALUE":
      return update(state, {
        credits: { [action.index]: { value: { $set: +action.payLoad } } },
      });
      break;
    case "CHANGE_DEBT_NAME":
      return update(state, {
        debts: { [action.index]: { name: { $set: action.payLoad } } },
      });
      break;
    case "CHANGE_DEBT_VALUE":
      return update(state, {
        debts: { [action.index]: { value: { $set: +action.payLoad } } },
      });
      break;
    case "CHANGE_DEBT_STATUS":
      return update(state, {
        debts: { [action.index]: { status: { $set: action.payLoad } } },
      });
      break;
    case "ADD_CREDIT":
      const creditObject = { name: "", value: "" };
      return update(state, {
        credits: { $splice: [[action.index + 1, 0, creditObject]] },
      });
      break;
    case "COPY_CREDIT":
      return update(state, {
        credits: { $splice: [[action.index + 1, 0, action.payLoad]] },
      });
      break;
    case "DELETE_CREDIT":
      if (!state.credits[1]) {
        alert("NAO E POSSIVEL DELETAR MAIS CREDITOS!");
        return state;
      }
      return update(state, {
        credits: { $splice: [[action.index, 1]] },
      });
      break;
    case "ADD_DEBT":
      const debtObject = { name: "", value: "" };
      return update(state, {
        debts: { $splice: [[action.index + 1, 0, debtObject]] },
      });
      break;
    case "COPY_DEBT":
      return update(state, {
        debts: { $splice: [[action.index + 1, 0, action.payLoad]] },
      });
      break;
    case "DELETE_DEBT":
      if (!state.debts[1]) {
        alert("NAO E POSSIVEL DELETAR MAIS DEBITOS!");
        return state;
      }
      return update(state, {
        debts: { $splice: [[action.index, 1]] },
      });
      break;
    case "REFRESH":
      return { ...INITIAL_STATE };
      break;
    case "EDIT_DATA":
      let editedData = { ...state };
      editedData = Object.assign(state, action.payLoad); // atribui os valores da lista alvo aos outros componentes de estado
      editedData.edit = true;
      return editedData;
      break;
    default:
      return state;
      break;
  }
};

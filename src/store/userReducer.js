const defaultStore = { id: "", email: "", name: "", lastname: "", tokken: "" };

const SET_ID = "SET_ID";
const SET_EMAIL = "SET_EMAIL";
const SET_TOKKEN = "SET_TOKKEN";

export const userReducer = (store = defaultStore, action) => {
  switch (action.type) {
    case SET_ID:
      return { ...store, id: action.payload };
    case SET_EMAIL:
      return { ...store, email: action.payload };
    case SET_TOKKEN:
      return { ...store, tokken: action.payload };
    default:
      return store;
  }
};

export const setIdAction = (payload) => ({ type: SET_ID, payload });
export const setEmailAction = (payload) => ({ type: SET_EMAIL, payload });
export const setTokken = (payload) => ({ type: SET_TOKKEN, payload });

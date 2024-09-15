const defaultStore = { dates: "", creative: "" };

const SET_DATES = "SET_DATES";
const SET_CREATIVE = "SET_CREATIVE";

export const creativeReducer = (store = defaultStore, action) => {
  switch (action.type) {
    case SET_DATES:
      return { ...store, dates: action.payload };
    case SET_CREATIVE:
      return { ...store, creative: action.payload };
    default:
      return store;
  }
};

export const setDatesAction = (payload) => ({ type: SET_DATES, payload });
export const setCreativeAction = (payload) => ({ type: SET_CREATIVE, payload });

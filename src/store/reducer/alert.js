import { REMOVE_ALERT, SET_ALERT } from "../action/alert";


const initialState = [];

export default function alertReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ALERT:
      return [...state, action.payload];  // Concisely add the new alert

    case REMOVE_ALERT:
      return state.filter(alert => alert.id !== action.payload); // Concisely remove by ID

    default:
      return state; 
  }
}

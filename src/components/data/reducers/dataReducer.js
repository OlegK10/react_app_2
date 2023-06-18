import data from '../data.json'

const defaultStateReserve = data;

export const dataReducer = (state = defaultStateReserve, action) => {

  switch (action.type) {
    case "GET_DATA":
      return state; 
    default:
      return state;
  }

};




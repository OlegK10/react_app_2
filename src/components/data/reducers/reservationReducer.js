const initialState = {
  countOfReserve: 0,
  
  reservations:
    []
  
};



export const reservationReducer = (state = initialState, action) => {


  switch (action.type) {
    case 'SET_RESERVE':
      return {
        ...state,
        countOfReserve: state.countOfReserve + 1,
        reservations: [...state.reservations , action.reserve]
      };
      
    case 'REMOVE_RESERVE':
      return {
        countOfReserve: state.countOfReserve - 1,
        reservations: [
          ...state.reservations.filter(
            item =>
              item.indexsOfReserves !== action.idOfPlane 
          )
        ]
      };
      

    case 'GET_RESERVE':
      return state;
    default:
      return state;
  }
};

import { combineReducers } from "redux";
import { reservationReducer } from "./reservationReducer";
import { dataReducer } from "./dataReducer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const rootReducer = combineReducers({
  reservation: reservationReducer ,
  data:  dataReducer
});
import {combineReducers} from '@reduxjs/toolkit';

// Reducers
import LoginReducer from './LoginReducer';

const combinedReducer = combineReducers({
  LoginReducer,
});

export const RootReducer = (state, action) => {
  if (action.type === '#RESET') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

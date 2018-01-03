// @flow
import { LOGIN_SUCCESS } from '../actions/types';

const initState = {
  isAuth: false,
  info: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true };
    default:
      return state;
  }
};

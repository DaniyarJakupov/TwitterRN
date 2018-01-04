// @flow
import { LOGIN_SUCCESS, GET_USER_INFO } from '../actions/types';

const initState = {
  isAuth: false,
  info: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isAuth: true };
    case GET_USER_INFO:
      return { ...state, info: action.payload };
    default:
      return state;
  }
};

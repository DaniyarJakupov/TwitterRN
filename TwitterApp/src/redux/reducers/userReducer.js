// @flow
import { LOGIN_SUCCESS, GET_USER_INFO, LOGOUT } from '../actions/types';

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
    case LOGOUT:
      return initState;
    default:
      return state;
  }
};

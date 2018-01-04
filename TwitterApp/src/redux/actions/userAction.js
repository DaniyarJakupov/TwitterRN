import { AsyncStorage } from 'react-native';

import { LOGIN_SUCCESS, GET_USER_INFO, LOGOUT } from './types';

export const userLogin = () => ({ type: LOGIN_SUCCESS });

export const getUserInfo = info => ({ type: GET_USER_INFO, payload: info });

export const userLogout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('@customtwittertoken');
    return dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    throw error;
  }
};

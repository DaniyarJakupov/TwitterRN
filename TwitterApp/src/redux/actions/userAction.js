import { LOGIN_SUCCESS, GET_USER_INFO } from './types';

export const userLogin = () => ({ type: LOGIN_SUCCESS });

export const getUserInfo = info => ({ type: GET_USER_INFO, payload: info });

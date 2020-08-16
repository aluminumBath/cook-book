import * as types from './types';
import { makeActionCreator } from '../action-creator-helpers';

export const toggleUserInfo = makeActionCreator(types.TOGGLE_USER_INFO);
export const clearUserInfo = makeActionCreator(types.CLEAR_USER_INFO);
export const setUser = makeActionCreator(types.SET_USER, 'user');
export const loginRequest = makeActionCreator(types.LOGIN_REQUEST);
export const loginSuccess = makeActionCreator(types.LOGIN_SUCCESS, 'response');
export const loginError = makeActionCreator(types.LOGIN_ERROR, 'errors');
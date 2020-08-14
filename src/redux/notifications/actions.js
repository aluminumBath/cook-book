import * as types from './types';
import { makeActionCreator } from '../action-creator-helpers';

export const getNotificationsRequest = makeActionCreator(types.GET_NOTIFICATIONS_REQUEST);
export const getNotificationsSuccess = makeActionCreator(types.GET_NOTIFICATIONS_SUCCESS, 'notifications');
export const getNotificationsFailure = makeActionCreator(types.GET_NOTIFICATIONS_FAILURE, 'err');
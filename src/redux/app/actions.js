import * as types from './types';
import { makeActionCreator } from '../action-creator-helpers';

export const setNavRoute = makeActionCreator(types.SET_NAV_ROUTE, 'navroute');
export const selectNotification = makeActionCreator(types.SELECT_NOTIFICATION, 'notification');
export const setChosenQuery = makeActionCreator(types.SET_CHOSEN_QUERY, 'query');

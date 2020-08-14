import { toast } from 'react-toastify';
import * as actions from './actions';

export function setNavRoute(navroute) {
  return actions.setNavRoute(navroute);
}

export function selectNotification(notif) {
  return actions.selectNotification(notif);
}

export function setChosenQuery(query) {
  return actions.setChosenQuery(query);
}
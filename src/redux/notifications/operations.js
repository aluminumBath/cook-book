import { toast } from 'react-toastify';
import * as actions from './actions';
import * as notificationsApi from '../../api/notifications';
import externalConfig from '../../externalConfig';

export function getNotifications() {
  return async (dispatch) => {
    try {
      dispatch(actions.getNotificationsRequest());
      const notificationsResp = await notificationsApi.getNotifications();
      if (notificationsResp.status !== 200) {
        return dispatch(actions.getNotificationsFailure(notificationsResp.error));
      } else {
        notificationsResp.response = JSON.parse(notificationsResp.response);
        if (notificationsResp.response.latest && notificationsResp.response.latest.length > 0) {
          notificationsResp.response.latest.forEach(note => {
            if (note.virality >= externalConfig.viralityThreshold.high ||
              note.manipulation  >= externalConfig.manipulationThreshold.high) {
              toast.error(`The ${note.topic} campaign has passed your set threshold. A virality score of ${note.virality} and a manipulation score of ${note.manipulation} was seen.`);
            } else if (note.virality >= externalConfig.viralityThreshold.medium ||
              note.manipulation  >= externalConfig.manipulationThreshold.medium) {
              toast.warn(`The ${note.topic} campaign has passed your set threshold. A virality score of ${note.virality} and a manipulation score of ${note.manipulation} was seen.`);
            } else {
              toast(`The ${note.topic} has passed your set threshold. A virality score of ${note.virality} and a manipulation score of ${note.manipulation} was seen.`);
            }
          });
        }
        return dispatch(actions.getNotificationsSuccess(notificationsResp.response));
      }
    } catch (err) {
      return dispatch(actions.getNotificationsFailure(err));
    }
  };
}
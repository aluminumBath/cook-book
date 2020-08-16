import externalConfig from '../../externalConfig';
import * as actions from './actions';
import * as esApi from '../../api/elasticsearch';
import { Auth } from 'aws-amplify';
import { useAuth0 } from "@auth0/auth0-react";

export function getUser(userObj) {
  return async (dispatch, getState) => {
    try {
      dispatch(actions.loginRequest());
      const attributes = (await Auth.currentSession()).getIdToken().payload;

      const { user, isAuthenticated } = useAuth0;
//      console.log('!!!!!!isAuthenticated: ', isAuthenticated);
//      console.log('!!!!!!user: ', user);

      console.log('!!!!!!user: ', attributes);
//      const state = getState().user;
      dispatch(actions.setUser(attributes));
//      if (attributes && attributes['cognito:username']) {
//        const response = await esApi.getUser(attributes['cognito:username'], userObj);
//        if (response.status === 404) {
//          dispatch(actions.setUser({email: attributes['cognito:username']}));
//          return dispatch(actions.toggleUserInfo());
//        } else {
//
//          console.log('response: ', response);
//          dispatch(actions.setUser(response.response));
//          return dispatch(actions.loginSuccess());
//        }
//      }
      return dispatch(actions.loginError('Error with user: ', userObj));
    } catch (error) {
      console.log('error signing up:', error);
      return dispatch(actions.loginError(error));
    }
  };
}

export function submitUserInfo(userInfo) {
  return async (dispatch) => {
    console.log('userInfo: ', userInfo);
    try {
      const response = esApi.createAndGetUser(userInfo.email, userInfo);
      console.log('response: ', response);
      dispatch(actions.setUser(response.response));
      return dispatch(actions.loginSuccess());
    } catch (error) {
      console.log('error signing up:', error);
      return dispatch(actions.loginError(error));
    }
  };
}

export function loginUser() {
  return async (dispatch, getState) => {
    dispatch(actions.loginRequest());
    dispatch(actions.clearUserInfo());
    console.log('test');
//    const response = await fetch(externalConfig.services.userService, {
//      method: 'GET',
//      headers: {
//        'Content-Type': 'application/json',
//      },
//    });
//    var bodyRes = await response.text();
    var bodyRes = {message: null};
    const response = {status: 200};

    if(response.status !== 200) throw Error(bodyRes.message);
    if(bodyRes !== undefined && bodyRes !== null) {
      try {
        return dispatch(actions.loginSuccess(JSON.parse(bodyRes)));
      } catch (e) {
        return dispatch(actions.loginError([e, bodyRes]));
      }
    }
    return dispatch(actions.loginError(bodyRes));
  };
}

export function toggleUserInfo() {
  return actions.toggleUserInfo();
}

export function setUser(newUser) {
  return actions.setUser(newUser);
}
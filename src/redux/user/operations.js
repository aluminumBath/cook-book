import * as actions from './actions';
import * as esApi from '../../api/elasticsearch';
import users from '../../users.json';
import { Auth } from 'aws-amplify';

export function getUser() {
  return async (dispatch, getState) => {
    try {
      dispatch(actions.loginRequest());
      const attributes = (await Auth.currentSession()).getIdToken().payload;
      console.log('attributes: ', attributes);
      console.log('attributes: ', attributes.email);
      console.log('users[email]: ', users[email]);
      const email = attributes.email;
      var userObj = {
        ...attributes,

      };
        dispatch(actions.setUser(userObj));
//      dispatch(actions.setUser(attributes));
      return dispatch(actions.loginSuccess(attributes));
    } catch (error) {
      console.log('getUser error signing up:', error.email);
      return dispatch(actions.loginError(error));
    }
  };
}

export function submitUserInfo(userInfo) {
  return async (dispatch) => {
    try {
      const response = esApi.createAndGetUser(userInfo.email, userInfo);
      dispatch(actions.setUser(response.response));
      return dispatch(actions.loginSuccess(response));
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
import * as actions from './actions';

export function loginUser() {
  return async (dispatch, getState) => {
    dispatch(actions.loginRequest());
    dispatch(actions.clearUserInfo());
    console.log('test');
    const response = await fetch(externalConfig.services.userService, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    var bodyRes = await response.text();

    if(response.status !== 200) throw Error(bodyRes.message);
    if(bodyRes !== undefined && bodyRes !== null) {
      try {
        return dispatch(actions.loginSuccessful(JSON.parse(bodyRes)));
      } catch (e) {
        return dispatch(actions.loginError([e, bodyRes]));
      }
    }
    return dispatch(actions.errorResponse(bodyRes));
  };
}

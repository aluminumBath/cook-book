import * as types from './types';

const defaultState = {
  userInfo: {},
  errors: [],
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.CLEAR_USER_INFO: {
      return {
        ...state,
        userInfo: {},
      };
    }
    case types.SET_USER: {
      return {
        ...state,
        userInfo: action.user,
      };
    }
    case types.LOGIN_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        errors: [
          ...state.errors,
          action.errors
        ]
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducer;

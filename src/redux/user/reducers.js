import * as types from './types';

const defaultState = {
  userInfo: {
    firstName: null,
    lastName: null,
  },
  errors: [],
  isUserInfoOpen: false
};

const userReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.TOGGLE_USER_INFO: {
      return {
        ...state,
        isUserInfoOpen: !state.isUserInfoOpen,
      };
    }
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

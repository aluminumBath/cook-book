import * as types from './types';

const defaultState = {
  notifications: [],
  loading: false,
  errors: []
};

const notificationsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_NOTIFICATIONS_REQUEST: {
      return {
        ...state,
        loading: true,
        notifications: []
      };
    }
    case types.GET_NOTIFICATIONS_SUCCESS: {
      return {
        ...state,
        loading: false,
        notifications: action.notifications,
      };
    }
    case types.GET_NOTIFICATIONS_FAILURE: {
      return {
        ...state,
        loading: false,
        notifications: [],
        errors: [
          ...state.errors,
          action.err
        ]
      };
    }
    default: {
      return state;
    }
  }
};

export default notificationsReducer;

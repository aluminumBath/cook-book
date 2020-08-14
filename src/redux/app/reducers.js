import * as types from './types';

const defaultState = {
  navroute: '/home',
  query: '',
  results: []
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_NAV_ROUTE: {
      return {
        ...state,
        navroute: action.navroute,
      };
    }
    default: {
      return state;
    }
  }
};

export default appReducer;

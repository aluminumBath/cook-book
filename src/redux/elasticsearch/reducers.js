import * as types from './types';

const defaultState = {
  queryResults: {},
  queryLoading: false,
  searchValue: '',
  aggregationResults: {},
  aggregationLoading: false,
  firstDocument: 0,
  pageSize: 10,
  errors: []
};

const elasticsearchReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.GET_ELASTICSEARCH_QUERY_REQUEST: {
      return {
        ...state,
        queryLoading: true,
        queryResults: {}
      };
    }
    case types.GET_ELASTICSEARCH_QUERY_SUCCESS: {
      return {
        ...state,
        queryLoading: false,
        queryResults: action.results,
      };
    }
    case types.GET_ELASTICSEARCH_QUERY_FAILURE: {
      return {
        ...state,
        queryLoading: false,
        queryResults: {},
        errors: [
          ...state.errors,
          action.err
        ]
      };
    }
    case types.UPDATE_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.newVal
      }
    }
    case types.UPDATE_FIRST_DOC: {
      return {
        ...state,
        firstDocument: action.newVal
      }
    }
    case types.UPDATE_SEARCH_BAR_VALUE: {
      return {
        ...state,
        searchValue: action.newVal
      }
    }
    case types.GET_AGGREGATIONS_REQUEST: {
      return {
        ...state,
        aggregationResults: {
          ...state.aggregationResults,
          [action.keyProp]: {
            ...state.aggregationResults[action.keyProp],
            loading: true
          }
        }
      };
    }
    case types.GET_AGGREGATIONS_SUCCESS: {
      return {
        ...state,
        aggregationResults: {
          ...state.aggregationResults,
          [action.keyProp]: {
            ...state.aggregationResults[action.keyProp],
            loading: false
          }
        }
      };
    }
    case types.GET_AGGREGATIONS_FAILURE: {
      return {
        ...state,
        aggregationResults: {
          ...state.aggregationResults,
          [action.keyProp]: {
            ...state.aggregationResults[action.keyProp],
            loading: false
          }
        },
        errors: [...state.errors, action.err]
      };
    }
    case types.SET_AGGREGATIONS: {
      return {
        ...state,
        aggregationResults: {
          ...state.aggregationResults,
          [action.keyProp]: {
            ...state.aggregationResults[action.keyProp],
            results: action.results
          }
        }
      }
    }
    default: {
      return state;
    }
  }
};

export default elasticsearchReducer;

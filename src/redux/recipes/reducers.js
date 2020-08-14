import * as types from './types';

const defaultState = {
  recipes: [],
  aggregations: {},
  loading: false,
  errors: [],
  pageSize: 3,
  currentRecipeIndex: 0,
  totalRecipes: 0,
};

const recipesReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SET_AGGREGATIONS: {
      return {
        ...state,
        aggregations: action.newObject,
      };
    }
    case types.SET_RECIPES: {
      return {
        ...state,
        recipes: action.newArray,
      };
    }
    case types.RECIPES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }
    case types.RECIPES_SUCCESS: {
      return {
        ...state,
        loading: false,
      };
    }
    case types.RECIPES_FAILURE: {
      return {
        ...state,
        loading: false,
        errors: [...state.errors, action.error]
      };
    }
    case types.SET_PAGE_SIZE: {
      return {
        ...state,
        pageSize: action.pageSize
      };
    }
    case types.SET_CURR_PAGE_INDEX: {
      return {
        ...state,
        currentRecipeIndex: action.newIndex
      };
    }
    case types.SET_TOTAL_RECIPES_LENGTH: {
      return {
        ...state,
        totalRecipes: action.newTotal
      };
    }
    default: {
      return state;
    }
  }
};

export default recipesReducer;

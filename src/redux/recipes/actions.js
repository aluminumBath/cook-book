import * as types from './types';
import { makeActionCreator } from '../action-creator-helpers';

export const recipesRequest = makeActionCreator(types.RECIPES_REQUEST);
export const recipesSuccess = makeActionCreator(types.RECIPES_SUCCESS);
export const recipesFailure = makeActionCreator(types.RECIPES_FAILURE, 'error');
export const setAuthors = makeActionCreator(types.SET_AUTHORS, 'newArray');
export const setRecipes = makeActionCreator(types.SET_RECIPES, 'newArray');
export const setSpecRecipe = makeActionCreator(types.SET_SPEC_RECIPE, 'newRecipe');
export const clearSpecRecipe = makeActionCreator(types.CLEAR_SPEC_RECIPE);
export const setAggregations = makeActionCreator(types.SET_AGGREGATIONS, 'newObject');
export const setPageSize = makeActionCreator(types.SET_PAGE_SIZE, 'pageSize');
export const setCurrPageIndex = makeActionCreator(types.SET_CURR_PAGE_INDEX, 'newIndex');
export const setTotalRecipesLength = makeActionCreator(types.SET_TOTAL_RECIPES_LENGTH, 'newTotal');

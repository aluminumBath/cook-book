import { toast } from 'react-toastify';
import * as actions from './actions';
import * as recipeApi from '../../api/elasticsearch';
import * as elasticsearchOperations from '../elasticsearch/operations';
import externalConfig from '../../externalConfig';

export function setRecipes(newArray) {
  return actions.setRecipes(newArray);
}

export function setAggregations(newArray) {
  return actions.setAggregations(newArray);
}

export function getRecipes() {
  return async (dispatch, getState) => {
    dispatch(actions.recipesRequest());
    const state = getState();
    const recipeResponse = await recipeApi.getRecipes(state.elasticsearch.searchValue);
    if (recipeResponse.status === 200) {
      let respBody = recipeResponse.response;
      let recipesArray = Object.keys(respBody).map(k => respBody[k]);
      let recipesTotal = recipesArray.length;
      const aggregationsArray = respBody.aggregations;
      dispatch(actions.setRecipes(recipesArray));
      dispatch(elasticsearchOperations.getAggregations('tags', 'Tags'));
      await dispatch(elasticsearchOperations.getAggregations('author', 'Chefs'));
      dispatch(actions.setAggregations(aggregationsArray));
      dispatch(actions.setCurrPageIndex(0));
      dispatch(actions.setTotalRecipesLength(recipesTotal));
      return dispatch(actions.recipesSuccess());
    }
    return dispatch(actions.recipesFailure(recipeResponse));
  };
}

export function getRecipe(id) {
  return async (dispatch, getState) => {
    dispatch(actions.recipesRequest());
    const recipeResponse = await recipeApi.getRecipe(id);
    if (recipeResponse.status === 200) {
      const respBody = JSON.parse(recipeResponse.response);
      dispatch(actions.setSpecRecipe(respBody));
      return dispatch(actions.recipesSuccess());
    }
    return dispatch(actions.recipesFailure(recipeResponse));
  };
}

export function submitRecipe(newRecipe) {
  return async (dispatch) => {
    dispatch(actions.recipesRequest());
    const recipeResponse = await recipeApi.submitRecipe(newRecipe);
    if (recipeResponse.status === 200 || recipeResponse.status === 201) {
      toast.success('Recipe successfully submitted.');
      dispatch(actions.recipesSuccess());
      return await dispatch(getRecipes());
    }
    toast.error('Recipe could not be submitted. Please check the logs.');
    return dispatch(actions.recipesFailure(recipeResponse));
  };
}

export function setPageSize(pageSize) {
  return actions.setPageSize(pageSize);
}

export function setCurrPageIndex(newIndex) {
  return actions.setCurrPageIndex(newIndex);
}

export function setTotalRecipesLength(newTotal) {
  return actions.setTotalRecipesLength(newTotal);
}

export function setSpecRecipe(newRecipe) {
  return actions.setSpecRecipe(newRecipe);
}

export function clearSpecRecipe() {
  return actions.clearSpecRecipe();
}

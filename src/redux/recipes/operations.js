import { toast } from 'react-toastify';
import * as actions from './actions';
import * as elasticsearchApi from '../../api/elasticsearch';
import * as elasticsearchOperations from '../elasticsearch/operations';

export function setRecipes(newArray) {
  return actions.setRecipes(newArray);
}

export function setAuthors(newArray) {
  return actions.setAuthors(newArray);
}

export function setAggregations(newArray) {
  return actions.setAggregations(newArray);
}

export function getRecipes() {
  return async (dispatch, getState) => {
    dispatch(actions.recipesRequest());
    const state = getState();
    const recipeResponse = await elasticsearchApi.getRecipes(state.elasticsearch.searchValue);
    const authorsResponse = await elasticsearchApi.getAuthors();
    if (recipeResponse.status === 200) {
      let respBody = recipeResponse.response;
      let recipesArray = Object.keys(respBody).map(k => respBody[k]);
      let recipesTotal = recipesArray.length;
      const aggregationsArray = respBody.aggregations;
      if (authorsResponse.status === 200) {
        let authBody = authorsResponse.response;
        let authorsArray = Object.keys(authBody).map(k => authBody[k]);
        dispatch(actions.setAuthors(authorsArray));
      }
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
    const recipeResponse = await elasticsearchApi.getRecipe(id);
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
    const recipeResponse = await elasticsearchApi.submitRecipe(newRecipe);
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

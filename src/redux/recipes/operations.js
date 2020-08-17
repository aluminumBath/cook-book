import { toast } from 'react-toastify';
import * as actions from './actions';
import * as recipeApi from '../../api/elasticsearch';

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
      const respBody = JSON.parse(recipeResponse.response);
      const recipesArray = respBody.hits && respBody.hits.hits ? respBody.hits.hits : [];
     const recipesTotal = respBody.hits && respBody.hits.total && respBody.hits.total.value ? respBody.hits.total.value : 0;
      const aggregationsArray = respBody.aggregations;
      dispatch(actions.setRecipes(recipesArray));
      dispatch(actions.setAggregations(aggregationsArray));
      dispatch(actions.setCurrPageIndex(0));
      dispatch(actions.setTotalRecipesLength(recipesTotal));
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
      return dispatch(getRecipes());
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

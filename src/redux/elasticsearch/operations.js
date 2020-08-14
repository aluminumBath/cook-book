import * as actions from './actions';
import * as elasticsearchApi from '../../api/elasticsearch';
import * as recipeOperations from '../../redux/recipes/operations';

export function getAggregations(key, displayName) {
  return async (dispatch) => {
    try {
      dispatch(actions.getAggregationsRequest(key));
      const elasticsearchResp = await elasticsearchApi.getAggregations(key, displayName);
      if (elasticsearchResp.status !== 200) {
        return dispatch(actions.getAggregationsFailure(elasticsearchResp.error, key));
      } else {
        const results = JSON.parse(elasticsearchResp.response).aggregations[displayName];
        dispatch(actions.setAggregations(results, key));
        return dispatch(actions.getAggregationsSuccess(key));
      }
    } catch (err) {
      return dispatch(actions.getAggregationsFailure(err, key));
    }
  };
}

export function searchES(newVal) {
  return async (dispatch, getState) => {
    const state = getState();
    try {
      dispatch(actions.getElasticsearchQueryRequest());
      const elasticsearchResp = await elasticsearchApi.queryEs(newVal, state.elasticsearch.pageSize);
      if (elasticsearchResp.status !== 200) {
        return dispatch(actions.getElasticsearchQueryFailure(elasticsearchResp.error));
      } else {

        const respBody = JSON.parse(elasticsearchResp.response);
        const recipesArray = respBody.hits.hits;
        const total = respBody.hits.total;
        const aggregationsArray = respBody.aggregations;
        dispatch(recipeOperations.setCurrPageIndex(0));
        dispatch(recipeOperations.setTotalRecipesLength(total));
        dispatch(recipeOperations.setRecipes(recipesArray));
        dispatch(recipeOperations.setAggregations(aggregationsArray));
        return dispatch(actions.getElasticsearchQuerySuccess(recipesArray));
      }
    } catch (err) {
      return dispatch(actions.getElasticsearchQueryFailure(err));
    }
  };
}

export function updateSearchValue(newVal) {
  return (dispatch) => {
    dispatch(updateSearchBarValue(newVal));
    return dispatch(searchES(newVal));
  };
}

export function updateSearchBarValue(newVal) {
  return actions.updateSearchBarValue(newVal);
}

export function updateFirstDocVal(newVal) {
  return actions.updateFirstDocVal(newVal);
}

export function updatePageSize(newVal) {
  return (dispatch, getState) => {
    const state = getState();
    dispatch(recipeOperations.setPageSize(newVal));
    return dispatch(searchES(state.elasticsearch.searchValue));
  };
}


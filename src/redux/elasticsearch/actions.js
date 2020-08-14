import * as types from './types';
import { makeActionCreator } from '../action-creator-helpers';

export const getAggregationsRequest = makeActionCreator(types.GET_AGGREGATIONS_REQUEST, 'keyProp');
export const getAggregationsSuccess = makeActionCreator(types.GET_AGGREGATIONS_SUCCESS, 'keyProp');
export const getAggregationsFailure = makeActionCreator(types.GET_AGGREGATIONS_FAILURE, 'err', 'keyProp');
export const updateSearchBarValue = makeActionCreator(types.UPDATE_SEARCH_BAR_VALUE, 'newVal');
export const getElasticsearchQueryRequest = makeActionCreator(types.GET_ELASTICSEARCH_QUERY_REQUEST);
export const getElasticsearchQuerySuccess = makeActionCreator(types.GET_ELASTICSEARCH_QUERY_SUCCESS, 'results');
export const getElasticsearchQueryFailure = makeActionCreator(types.GET_ELASTICSEARCH_QUERY_FAILURE, 'err');
export const updateFirstDocVal = makeActionCreator(types.UPDATE_FIRST_DOC, 'newVal');
export const updatePageSize = makeActionCreator(types.UPDATE_PAGE_SIZE, 'newVal');
export const setAggregations = makeActionCreator(types.SET_AGGREGATIONS, 'results', 'keyProp');
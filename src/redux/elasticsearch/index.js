import reducer from './reducers';
import * as elasticsearchOperations from './operations';
import * as elasticsearchSelectors from './selectors';
import * as elasticsearchTypes from './types';
import * as elasticsearchActions from './actions';

export default reducer;

export {
  elasticsearchOperations,
  elasticsearchSelectors,
  elasticsearchTypes,
  elasticsearchActions,
};

import { combineReducers } from 'redux';

// Import Reducers
import app from './redux/app/reducers';
import elasticsearch from './redux/elasticsearch/reducers';
import notifications from './redux/notifications/reducers';
import recipes from './redux/recipes/reducers';
import user from './redux/user/reducers';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  elasticsearch,
  notifications,
  recipes,
  user,
});

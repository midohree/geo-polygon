import { combineReducers } from 'redux';

import mapReducer from './map/mapSlice';

export default combineReducers({
  mapReducer: mapReducer,
});

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import { all } from 'redux-saga/effects';

import { MAP, mapReducer } from '../features/slice';
import { watchUnload } from '../features/saga';

export const rootReducer = combineReducers({
  [MAP]: mapReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([watchUnload()]);
}

const createStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: [sagaMiddleware],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;

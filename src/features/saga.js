import { call, put, takeLatest } from 'redux-saga/effects';
import { fetchIP } from '../api';
import { mapAction } from './slice';

function* handleMainLatLng() {
  const { loadMainLatLngSuccess, loadMainLatLngFail } = mapAction;

  try {
    const coordinates = yield call(fetchIP);

    yield put(loadMainLatLngSuccess(coordinates));
  } catch (err) {
    yield put(loadMainLatLngFail(err));
  }
}

export function* watchUnload() {
  const { loadMainLatLng } = mapAction;

  yield takeLatest(loadMainLatLng, handleMainLatLng);
}

import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  mainCoord : { lat: null, lng: null },
  error: null,
};

const reducers = {
  loadMainLatLng: state => {
    state.isLoading = true;
  },
  loadMainLatLngSuccess: (state, { payload: result }) => {
    const { latitude, longitude } = result;

    state.mainCoord.lat = latitude;
    state.mainCoord.lng = longitude;

    state.isLoading = false;
  },
  loadMainLatLngFail: (state, { payload: error }) => {
    state.isLoading = false;
    state.error = error;
  }
};

const name = 'MAP';

const slice = createSlice({
  name,
  initialState,
  reducers,
});

const selectAllState = createSelector(
  state => state.isLoading,
  state => state.mainCoord,
  state => state.error,
  (isLoading, mainCoord, error) => {
    return { isLoading, mainCoord, error };
  }
);

export const mapSelector = {
  all: state => selectAllState(state[MAP])
}

export const MAP = slice.name;
export const mapReducer = slice.reducer;
export const mapAction = slice.actions;
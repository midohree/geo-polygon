import { createSelector, createSlice } from '@reduxjs/toolkit';

import { NAME } from '../constants';

const slice = createSlice({
  name: NAME.MAP,
  initialState: {
    isLoading: false,
    mainCoord : { lat: null, lng: null },
    error: null,
  },
  reducers: {
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
    },
  },
});

const selectAllState = createSelector(
  state => state.isLoading,
  state => state.mainCoord,
  state => state.error,
  (isLoading, mainCoord, error) => {
    return { isLoading, mainCoord, error };
  },
);

export const MAP = slice.name;
export const mapSelector = { all: state => selectAllState(state[NAME.MAP]) };
export const mapReducer = slice.reducer;
export const mapAction = slice.actions;

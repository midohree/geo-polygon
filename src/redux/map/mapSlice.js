import { createSlice } from '@reduxjs/toolkit';

const mapSlice = createSlice({
  name: 'coordinates',
  initialState: {},
  reducers: {
    getTargetLatLng(state, action) {
      const { lat, lng } = action.payload;

      state.lat = lat;
      state.lng = lng;
    },
  }
});

export const { getTargetLatLng } = mapSlice.actions;

export default mapSlice.reducer;

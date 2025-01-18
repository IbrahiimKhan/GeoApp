import {createSlice} from '@reduxjs/toolkit';

export interface GeoFenceState {
  savedMaps: {id: string; name: string; coordinates: any[]}[];
}

const initialState: GeoFenceState = {
  savedMaps: [],
};

const geoFenceSlice = createSlice({
  name: 'geoFence',
  initialState,
  reducers: {
    saveMap: (state, action) => {
      const existingMapIndex = state.savedMaps.findIndex(
        map => map.id === action.payload.id,
      );
      if (existingMapIndex !== -1) {
        state.savedMaps[existingMapIndex] = action.payload;
      } else {
        state.savedMaps.push(action.payload);
      }
    },
  },
});

export const {saveMap} = geoFenceSlice.actions;
export default geoFenceSlice.reducer;

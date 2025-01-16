import {createSlice, configureStore} from '@reduxjs/toolkit';

const initialState = {
  savedMaps: [],
};

const geoFenceSlice = createSlice({
  name: 'geoFence',
  initialState,
  reducers: {
    saveMap: (state, action) => {
      state.savedMaps.push(action.payload);
    },
  },
});

export const {saveMap} = geoFenceSlice.actions;

export const store = configureStore({
  reducer: {
    geoFence: geoFenceSlice.reducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import geoFenceReducer from './slice/geoFenceSlice';
import reduxStorage from './storage';

export interface GeoFenceState {
  savedMaps:any[];
}

export interface RootState {
  geoFence: GeoFenceState;
}


const persistConfig: PersistConfig<GeoFenceState> = {
  key: 'geoFence',
  storage: reduxStorage,
};


const persistedReducer = persistReducer(persistConfig, geoFenceReducer);


export const store = configureStore({
  reducer: {
    geoFence: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        ignoredPaths: ['geoFence'],
      },
    }),
});



export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);

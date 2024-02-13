import {configureStore} from '@reduxjs/toolkit';
import {RootReducer} from '@reducers/ReducersRoot';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

/**
 * Whitelist reducers will stored into storage
 * Retreive data to reducers once app get open
 */
const whitelist = ['LoginReducer'];

// persist configs
const persistConfig = {
  key: 'root',
  version: 1,
  whitelist,
  storage: AsyncStorage,
  debug: __DEV__,
};

// persist reducer
const persistedReducer = persistReducer(persistConfig, RootReducer);

// middleware
const middleware = getDefaultMiddleware => {
  return getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  });
};

// setup store
export const store = configureStore({
  reducer: persistedReducer,
  middleware,
});

// persist store
export const persistor = persistStore(store);

// store state interface
export type IStoreState = ReturnType<typeof store.getState>;

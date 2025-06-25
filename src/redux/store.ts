// create RTK Tool kit store with middleware with typescript
import {Action, configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import AsyncStorageAdapter from './MMKVStorage';
import allReducers from './reducers/index';
import {main} from './apis/main.api';
import {user} from './apis/user.api';
import {petsApi} from './apis/pets.api';

const persistConfig = {
  key: 'root',
  storage: AsyncStorageAdapter,
  timeout: undefined,
  whitelist: ['generalSlice', 'userSlice', user.reducerPath, main.reducerPath, petsApi.reducerPath],
  blacklist: ['flightSlice'],
};

const rootReducer = (state: any, action: Action) => {
  if (action.type === 'LOGOUT') {
    AsyncStorageAdapter.removeItem('persist:root');
    return allReducers(undefined, action);
  }
  return allReducers(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(user.middleware)
      .concat(main.middleware)
      .concat(petsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

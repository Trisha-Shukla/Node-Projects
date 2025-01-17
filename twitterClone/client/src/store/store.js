import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userSlice from './userSlice'
import tweetSlice from './tweetSlice'

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }
  const rootReducer=combineReducers({
    userData:userSlice,
    tweetData:tweetSlice,
  })
  
  const persistedReducer = persistReducer(persistConfig, rootReducer)

export const twitterStore=configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
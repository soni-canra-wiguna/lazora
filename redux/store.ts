import { combineReducers, configureStore } from "@reduxjs/toolkit"
import stateViewReducer from "./features/view-state/view-state-slice"
import favouriteReducer from "./features/favourite/favourite-slice"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from "redux-persist"

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["favourites"],
}

const rootReducer = combineReducers({
  stateView: stateViewReducer,
  favourites: favouriteReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  // middleware: (getDefaultMiddleware) => {
  //   getDefaultMiddleware({ serializableCheck: {
  //     ignoredPaths: ['']
  //   } })
  // },
})

// export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// =========
// import { configureStore } from "@reduxjs/toolkit"
// import stateViewReducer from "./features/view-state/view-state-slice"
// import favouriteReducer from "./features/favourite/favourite-slice"

// export const store = configureStore({
//   reducer: {
//     stateView: stateViewReducer,
//     favourites: favouriteReducer,
//   },
// })

// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

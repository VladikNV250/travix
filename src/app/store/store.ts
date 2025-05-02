import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { stopsReducer } from "features/stops";

const rootReducer = combineReducers({
    stops: stopsReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
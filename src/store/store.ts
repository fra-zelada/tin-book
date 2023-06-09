import { booksSlice, uiSlice } from "@/slice";
import {
    MiddlewareArray,
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const reducers = combineReducers({
    book: booksSlice.reducer,
    ui: uiSlice.reducer,
});
const persistConfig = {
    key: "root",
    storage,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: new MiddlewareArray(),
});
export let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

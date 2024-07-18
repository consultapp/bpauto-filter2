import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { brandApi } from "./api/brand";
import { setupListeners } from "@reduxjs/toolkit/query";
import { modelApi } from "./api/model";
import { generationApi } from "./api/generation";

export const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    [brandApi.reducerPath]: brandApi.reducer,
    [modelApi.reducerPath]: modelApi.reducer,
    [generationApi.reducerPath]: generationApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      brandApi.middleware,
      modelApi.middleware,
      generationApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

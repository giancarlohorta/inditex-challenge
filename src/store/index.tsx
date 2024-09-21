import { configureStore } from "@reduxjs/toolkit";
import episodeReducer from "../features/episodeSlice";
import podcastReducer from "../features/podecastSlice";

export const store = configureStore({
  reducer: {
    episodes: episodeReducer,
    podcasts: podcastReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

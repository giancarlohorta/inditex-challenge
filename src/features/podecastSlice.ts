import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PodcastData } from "../types";

interface PodcastState {
  data: PodcastData | {};
}

const initialState: PodcastState = {
  data: {}
};

const podcastSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {
    setPodcasts(state, action: PayloadAction<PodcastData | {}>) {
      state.data = action.payload;
    },
    resetPodcasts: () => initialState
  }
});

export const { setPodcasts, resetPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;

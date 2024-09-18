import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EpisodesData } from "../types";

interface EpisodeState {
  list: Record<string, { data: EpisodesData | {} }>;
}

const initialState: EpisodeState = {
  list: {}
};

const episodeSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    setEpisodes(state, action: PayloadAction<{ podcastId: string; data: EpisodesData | {} }>) {
      state.list[action.payload.podcastId] = {
        data: action.payload.data
      };
    }
  }
});

export const { setEpisodes } = episodeSlice.actions;

export default episodeSlice.reducer;

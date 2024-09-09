import { mockEpisodes, mockPodcasts } from "../../mocks";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Podcast from "./Podcast";
import { KEY_PODCASTS } from "../../constants/constants";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { LoadingContext } from "../../context/LoadingContext";
import { useState } from "react";

const mockAxios = new MockAdapter(axios);

export default {
  title: "Pages/Podcast",
  component: Podcast,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The Episode component displays a podcast episode's details, including title, description, and an audio player. It uses `useParams` from `react-router-dom` to fetch the `podcastId` and `episodeId`, and `useEpisodeData` to retrieve the episode data."
      }
    }
  }
};
const MockLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};
const Template = (args) => {
  localStorage.clear();
  localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));
  mockAxios.onGet(/lookup/g).reply(200, mockEpisodes);
  localStorage.setItem(`${args.podcastId}Data`, JSON.stringify(mockEpisodes));
  const initialEntries = [
    `/podcast/${args.podcastId}`,
    `/podcast/${args.podcastId}/episode/${args.episodeId}`
  ];
  return (
    <MockLoadingProvider>
      <MemoryRouter initialEntries={[args.episode ? initialEntries[1] : initialEntries[0]]}>
        <Routes>
          <Route path="/podcast/:podcastId/*" element={<Podcast />} />
        </Routes>
      </MemoryRouter>
    </MockLoadingProvider>
  );
};

export const DefaultEpisodes = Template.bind({});
DefaultEpisodes.args = {
  podcastId: "1535809341",
  episodeId: "1000659456383"
};

export const DefaultEpisode = Template.bind({});
DefaultEpisode.args = {
  podcastId: "1535809341",
  episodeId: "1000659456383",
  episode: true
};

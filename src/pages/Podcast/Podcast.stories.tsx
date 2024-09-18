import { mockEpisodes, mockPodcasts } from "../../mocks";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Podcast from "./Podcast";
import { KEY_PODCASTS } from "../../constants/constants";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { LoadingContext } from "../../context/LoadingContext";
import { ReactNode, useState } from "react";

export default {
  title: "Pages/Podcast",
  component: Podcast,
  parameters: {
    docs: {
      description: {
        component:
          "The Podcast component displays a podcast and its episodes. It uses `useParams` from `react-router-dom` to fetch `podcastId` and `episodeId`, and uses `useEpisodeData` to retrieve episode data."
      }
    }
  }
};

interface MockLoadingProviderProps {
  children: ReactNode;
}

const MockLoadingProvider = ({ children }: MockLoadingProviderProps) => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

const createMockAxios = () => new MockAdapter(axios);

interface TemplateProps {
  initialRoute: string;
  podcastId: string;
  episodeId: string;
}

const Template = (args: TemplateProps) => {
  return (
    <MockLoadingProvider>
      <MemoryRouter initialEntries={[args.initialRoute]}>
        <Routes>
          <Route path="/podcast/:podcastId/*" element={<Podcast />} />
        </Routes>
      </MemoryRouter>
    </MockLoadingProvider>
  );
};

export const DefaultEpisodes = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.reset();
  mockAxios.onGet(/lookup/g).reply(200, mockEpisodes);
  window.localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));
  return (
    <Template
      podcastId="1535809341"
      episodeId="1000659456383"
      initialRoute={`/podcast/1535809341`}
    />
  );
};

export const DefaultEpisode = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.reset();
  mockAxios.onGet(/lookup/g).reply(200, mockEpisodes);
  window.localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));
  window.localStorage.setItem("1535809341Data", JSON.stringify(mockEpisodes));
  return (
    <Template
      podcastId="1535809341"
      episodeId="1000659456383"
      initialRoute={`/podcast/1535809341/episode/1000659456383`}
    />
  );
};

export const EmptyResponse = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.reset();

  mockAxios.onGet(/lookup/g).reply(200, {
    resultCount: 0,
    results: []
  });
  window.localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));
  return (
    <Template
      podcastId="1535809341"
      episodeId="1000659456383"
      initialRoute={`/podcast/1535809341`}
    />
  );
};

export const ErrorResponse = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.reset();

  mockAxios.onGet(/lookup/g).reply(500, null);
  window.localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));
  return (
    <Template
      podcastId="1535809341"
      episodeId="1000659456383"
      initialRoute={`/podcast/1535809341`}
    />
  );
};

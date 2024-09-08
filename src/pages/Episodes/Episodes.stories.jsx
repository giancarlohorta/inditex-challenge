import Episodes from "./Episodes";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../../context/LoadingContext";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockEpisodes } from "../../mocks";

const mockPodcastId = "12345";

const mockAxios = new MockAdapter(axios);

const withProviders = (Story) => (
  <MemoryRouter initialEntries={[`/podcast/${mockPodcastId}`]}>
    <LoadingProvider>
      <Story />
    </LoadingProvider>
  </MemoryRouter>
);

export default {
  title: "Pages/Episodes",
  component: Episodes,
  decorators: [withProviders]
};

export const DefaultState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/lookup/g).reply(200, mockEpisodes);
  return <Episodes />;
};

export const ErrorState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/lookup/g).reply(500);
  return <Episodes />;
};

export const EmptyState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/lookup/g).reply(200, { results: [] });
  return <Episodes />;
};

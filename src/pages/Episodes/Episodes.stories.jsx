import Episodes from "./Episodes";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../../context/LoadingContext";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockEpisodes } from "../../mocks";

export default {
  title: "Pages/Episodes",
  component: Episodes,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <LoadingProvider>
          <Story />
        </LoadingProvider>
      </MemoryRouter>
    )
  ],
  parameters: {
    docs: {
      description: {
        component:
          "The Episodes page displays a list of episodes for a selected podcast. It fetches data from an API and handles loading, error, and empty states."
      }
    }
  }
};

const createMockAxios = () => new MockAdapter(axios);

export const DefaultState = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.reset();
  mockAxios.onGet(/lookup/g).reply(200, mockEpisodes);

  return <Episodes />;
};

export const ErrorState = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.reset();
  mockAxios.onGet(/lookup/g).reply(500);

  return <Episodes />;
};

export const EmptyState = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.reset();
  mockAxios.onGet(/lookup/g).reply(200, { results: [] });

  return <Episodes />;
};

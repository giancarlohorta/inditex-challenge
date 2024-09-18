import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../../context/LoadingContext";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockPodcasts } from "../../mocks";
import { StoryFn } from "@storybook/react";

export default {
  title: "Pages/Home",
  component: Home,
  tags: ["autodocs"],
  decorators: [
    (Story: StoryFn) => (
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
          "The Home page displays the list of top podcasts. It fetches data from an API and handles loading and error states."
      }
    }
  }
};

const createMockAxios = () => new MockAdapter(axios);

export const DefaultState = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

  return <Home />;
};

export const ErrorState = () => {
  window.localStorage.clear();
  const mockAxios = createMockAxios();
  mockAxios.onGet(/toppodcasts/g).reply(500);

  return <Home />;
};

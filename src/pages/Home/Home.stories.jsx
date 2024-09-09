import Home from "./Home";
import { MemoryRouter } from "react-router-dom";
import { LoadingProvider } from "../../context/LoadingContext";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { mockPodcasts } from "../../mocks";

const mockAxios = new MockAdapter(axios);

export default {
  title: "Pages/Home",
  component: Home,
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
          "The Home page displays the list of top podcasts. It fetches data from an API and handles loading and error states."
      }
    }
  }
};

export const DefaultState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

  return <Home />;
};

export const ErrorState = () => {
  window.localStorage.clear();
  mockAxios.onGet(/toppodcasts/g).reply(500);

  return <Home />;
};

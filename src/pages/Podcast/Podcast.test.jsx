import { render, screen, waitFor, act } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useParams } from "react-router-dom";
import Podcast from "./Podcast";
import { KEY_PODCASTS } from "../../constants/constants";
import {
  mockEpisodes,
  mockNormalizedEpisode,
  mockNormalizedPodcast,
  mockPodcasts
} from "../../mocks";
import { useLoading } from "../../context/LoadingContext";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockAxios = new MockAdapter(axios);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));
jest.mock("../../context/LoadingContext", () => ({
  useLoading: jest.fn()
}));

const renderPodcast = (path) => {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/podcast/:podcastId/*" element={<Podcast />} />
      </Routes>
    </MemoryRouter>
  );
};

describe("Podcast Page", () => {
  const podcastId = "1535809341";
  const episodeId = "1000659456383";
  let setIsLoading;

  beforeEach(() => {
    setIsLoading = jest.fn();
    useLoading.mockReturnValue({ setIsLoading });
    jest.mocked(useParams).mockReturnValue({ podcastId, episodeId });
    localStorage.clear();
  });

  test("should display podcast data and podcast episodes", async () => {
    localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));
    mockAxios.onGet(/lookup/g).reply(200, mockEpisodes);

    await act(async () => {
      renderPodcast(`/podcast/${podcastId}`);
    });

    await waitFor(() => {
      expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
      expect(screen.getByText(/The Joe Budden Network/i)).toBeInTheDocument();
      expect(screen.getByText(/Tune into Joe Budden and his friends./i)).toBeInTheDocument();

      const image = screen.getByAltText("The Joe Budden Podcast");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockNormalizedPodcast.image);

      const linkElement = screen.getByRole("link", {
        name: /The Joe Budden Network/i
      });

      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", `/podcast/${podcastId}`);

      expect(screen.getByText(/Episodes: 13/i)).toBeInTheDocument();
    });
  });

  test("should display podcast data and podcast episode", async () => {
    localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodes));

    await act(async () => {
      renderPodcast(`/podcast/${podcastId}/episode/${episodeId}`);
    });

    await waitFor(() => {
      expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
      expect(screen.getByText(/The Joe Budden Network/i)).toBeInTheDocument();
      expect(screen.getByText(/Tune into Joe Budden and his friends./i)).toBeInTheDocument();

      const image = screen.getByAltText("The Joe Budden Podcast");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", mockNormalizedPodcast.image);

      const linkElement = screen.getByRole("link", {
        name: /The Joe Budden Network/i
      });

      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", `/podcast/${podcastId}`);

      expect(screen.getByText(mockNormalizedEpisode.name)).toBeInTheDocument();
    });
  });
});

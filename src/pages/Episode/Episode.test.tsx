import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import Episode from "./Episode";
import { mockEpisodes, mockNormalizedEpisode } from "../../mocks";
import { Provider } from "react-redux";
import { store } from "../../store";
import { resetStore } from "../../utils/functions";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

describe("Episode Page", () => {
  const podcastId = "1234";
  const episodeId = "1000659456383";

  beforeEach(() => {
    localStorage.clear();
    resetStore();
    jest.mocked(useParams).mockReturnValue({ podcastId, episodeId });
  });

  test("should render episode title correctly", async () => {
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodes));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Episode />
        </MemoryRouter>
      </Provider>
    );

    const episodeTitle = await screen.findByText(mockNormalizedEpisode.name);
    expect(episodeTitle).toBeInTheDocument();

    const episodeDescription = screen.getByText(/Transmissions Season 2 launches in August/i);
    expect(episodeDescription).toBeInTheDocument();

    const audioElement = screen.getByRole("region", { name: /Audio Player/i });
    expect(audioElement).toHaveAttribute("src", mockNormalizedEpisode.episodeUrl);
  });

  test("should render 'No Description' if description is empty", async () => {
    const mockWithoutDescription = {
      ...mockEpisodes.results.find(({ trackId }) => trackId === Number(episodeId)),
      description: ""
    };
    const mockEpisodesNoDescription = {
      resultCount: 12,
      results: [
        ...mockEpisodes.results.filter(({ trackId }) => trackId !== Number(episodeId)),
        { ...mockWithoutDescription }
      ]
    };

    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodesNoDescription));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Episode />
        </MemoryRouter>
      </Provider>
    );

    const noDescriptionText = await screen.findByText("No Description");
    expect(noDescriptionText).toBeInTheDocument();
  });

  test("should render 'Invalid podcast or episode ID.' when params are missing", () => {
    jest.mocked(useParams).mockReturnValue({ podcastId: "", episodeId: "" });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Episode />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Invalid podcast or episode ID.")).toBeInTheDocument();
  });

  test("should render 'Loading episode data...' when episode data is not available", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Episode />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Loading episode data...")).toBeInTheDocument();
  });

  test("should render 'Audio unavailable' if episodeUrl is not provided", async () => {
    const mockWithoutAudio = {
      ...mockEpisodes.results.find(({ trackId }) => trackId === Number(episodeId)),
      episodeUrl: "" // Simulando que não há URL de áudio disponível
    };
    const mockEpisodesNoAudio = {
      resultCount: 12,
      results: [
        ...mockEpisodes.results.filter(({ trackId }) => trackId !== Number(episodeId)),
        { ...mockWithoutAudio }
      ]
    };

    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodesNoAudio));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Episode />
        </MemoryRouter>
      </Provider>
    );

    const audioUnavailableText = await screen.findByText("Audio unavailable");
    expect(audioUnavailableText).toBeInTheDocument();
  });
});

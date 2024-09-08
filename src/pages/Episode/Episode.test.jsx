import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import Episode from "./Episode";
import { mockEpisodes, mockNormalizedEpisode } from "../../mocks";

// Mock da função useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

describe("Episode Page", () => {
  const podcastId = "1234";
  const episodeId = "1000659456383";

  beforeEach(() => {
    localStorage.clear();
    jest.mocked(useParams).mockReturnValue({ podcastId, episodeId });
  });

  test("should render episode title correctly", async () => {
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodes));

    render(
      <MemoryRouter>
        <Episode />
      </MemoryRouter>
    );

    // Verifica se o título do episódio é exibido corretamente
    const episodeTitle = await screen.findByText(mockNormalizedEpisode.name);
    expect(episodeTitle).toBeInTheDocument();

    const episodeDescription = screen.getByText(/Transmissions Season 2 launches in August/i);
    expect(episodeDescription).toBeInTheDocument();

    const audioElement = screen.getByRole("region", { name: /Audio Player/i });
    expect(audioElement).toHaveAttribute("src", mockNormalizedEpisode.name.episodeUrl);
  });

  test("should render 'No Description' if description is empty", async () => {
    const mockWithoutDescription = mockEpisodes.results.find(
      ({ trackId }) => trackId === episodeId
    );
    const mockEpisodesNoDescription = {
      resultCount: 13,
      results: [
        ...mockEpisodes.results.filter(({ trackId }) => trackId === episodeId),
        { ...mockWithoutDescription, description: "" }
      ]
    };

    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodesNoDescription));

    render(
      <MemoryRouter>
        <Episode />
      </MemoryRouter>
    );

    // Verifica se "No Description" é exibido quando a descrição está vazia
    const noDescriptionText = await screen.findByText("No Description");
    expect(noDescriptionText).toBeInTheDocument();
  });
});

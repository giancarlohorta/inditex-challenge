import { render, screen } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import Episode from "./Episode";
import { mockEpisodes, mockNormalizedEpisode } from "../../mocks";

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
      <MemoryRouter>
        <Episode />
      </MemoryRouter>
    );

    const noDescriptionText = await screen.findByText("No Description");
    expect(noDescriptionText).toBeInTheDocument();
  });
});

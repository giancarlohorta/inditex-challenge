import { render, screen, waitFor } from "@testing-library/react";
import useEpisodeData from "./useEpisodeData";
import { mockEpisodes, mockNormalizedEpisode } from "../mocks";

const HookWrapper = ({ hook }) => {
  const data = hook();
  return <div data-testid="result">{JSON.stringify(data)}</div>;
};

describe("useEpisodeData", () => {
  const podcastId = "1234";
  const episodeId = "1000659456383";
  beforeEach(() => {
    localStorage.clear();
  });

  test("should fetch and store data if no cache exists", async () => {
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodes));
    render(<HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockNormalizedEpisode)
      );
    });
  });
  test("should return empty object when localStorage has no data", async () => {
    render(<HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });
  test("should return empty object if episode is not found in the normalized data", async () => {
    localStorage.setItem(
      `${podcastId}Data`,
      JSON.stringify({
        results: [
          { id: 1, name: "Episode 1", description: "Description of Episode 1" },
          { id: 2, name: "Episode 2", description: "Description of Episode 2" }
        ]
      })
    );

    render(<HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });
});

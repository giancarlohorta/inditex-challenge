import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import useEpisodeData from "./useEpisodeData";
import { setEpisodes } from "../features/episodeSlice";
import { mockEpisodes, mockNormalizedEpisode } from "../mocks";
import { NormalizedEpisode } from "../types";
import { resetStore } from "../utils/functions";

interface HookWrapperProps {
  hook: () => NormalizedEpisode | {};
}

const HookWrapper = ({ hook }: HookWrapperProps) => {
  const data = hook();
  return <div data-testid="result">{JSON.stringify(data)}</div>;
};

describe("useEpisodeData", () => {
  const podcastId = "1234";
  const episodeId = "1000659456383";

  beforeEach(() => {
    localStorage.clear();
    resetStore();
  });

  test("should return normalized data from localStorage if available", async () => {
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodes));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockNormalizedEpisode)
      );
    });
  });

  test("should fetch and store episodes in Redux if data not in store but available in localStorage", async () => {
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodes));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().episodes.list[podcastId].data).toEqual(mockEpisodes);
    });
  });

  test("should return empty object when localStorage has no data", async () => {
    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should return empty object if episode is not found", async () => {
    const invalidEpisodeId = "999999";
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(mockEpisodes));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, invalidEpisodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should handle JSON parsing errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem(`${podcastId}Data`, "{ invalid json ");

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error parsing episode data from localStorage",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  test("should return data from Redux store if available", async () => {
    store.dispatch(setEpisodes({ podcastId, data: mockEpisodes }));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockNormalizedEpisode)
      );
    });
  });

  test("should handle dataPodcasts without results gracefully", async () => {
    const invalidData = { someOtherField: "invalid data" };
    localStorage.setItem(`${podcastId}Data`, JSON.stringify(invalidData));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should set episodeData to an empty object if episodeId is not found in episodesData", async () => {
    store.dispatch(
      setEpisodes({
        podcastId,
        data: {
          results: [
            {
              trackId: 5678,
              trackName: "Episode 1",
              trackTimeMillis: 300000,
              releaseDate: "2023-09-20",
              episodeUrl: "http://example.com/episode1",
              description: "Description of episode 1"
            },
            {
              trackId: 91011,
              trackName: "Episode 2",
              trackTimeMillis: 350000,
              releaseDate: "2023-09-21",
              episodeUrl: "http://example.com/episode2",
              description: "Description of episode 2"
            }
          ]
        }
      })
    );

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useEpisodeData(podcastId, episodeId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });
});

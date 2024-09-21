import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";
import usePodcastData from "./usePodcastData";
import { mockPodcasts, mockNormalizedPodcast } from "../mocks";
import { KEY_PODCASTS } from "../constants/constants";
import { resetStore } from "../utils/functions";
import { setPodcasts } from "../features/podecastSlice";
import { NormalizedPodcast } from "../types";

interface HookWrapperProps {
  hook: () => NormalizedPodcast | {};
}

const HookWrapper = ({ hook }: HookWrapperProps) => {
  const data = hook();
  return <div data-testid="result">{JSON.stringify(data)}</div>;
};

describe("usePodcastData", () => {
  const podcastId = "1535809341";

  beforeEach(() => {
    localStorage.clear();
    resetStore();
  });

  test("should fetch and normalize podcast data if it exists in localStorage", async () => {
    localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockNormalizedPodcast)
      );
    });
  });

  test("should store podcasts data in Redux when fetched from localStorage", async () => {
    localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(store.getState().podcasts.data).toEqual(mockPodcasts);
    });
  });

  test("should return an empty object when localStorage has no data", async () => {
    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should return an empty object if podcast is not found in the normalized data", async () => {
    localStorage.setItem(
      KEY_PODCASTS,
      JSON.stringify({
        feed: {
          entry: [
            {
              id: { attributes: { "im:id": "5678" } },
              "im:name": "Podcast 1",
              "im:artist": { label: "Author 1" },
              "im:image": [{ label: "test" }, { label: "test" }, { label: "test" }],
              summary: { label: "description" }
            },
            {
              id: { attributes: { "im:id": "91011" } },
              "im:name": "Podcast 2",
              "im:artist": { label: "Author 2" },
              "im:image": [{ label: "test" }, { label: "test" }, { label: "test" }],
              summary: { label: "description" }
            }
          ]
        }
      })
    );

    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should handle JSON parsing errors gracefully", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem(KEY_PODCASTS, "{ invalid json ");

    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
    expect(consoleSpy).toHaveBeenCalledWith(
      "Error retrieving or processing podcast data from localStorage:",
      expect.any(Error)
    );
    consoleSpy.mockRestore();
  });

  test("should return data from Redux if available", async () => {
    store.dispatch(setPodcasts(mockPodcasts));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockNormalizedPodcast)
      );
    });
  });

  test("should handle empty or invalid data in localStorage gracefully", async () => {
    localStorage.setItem(KEY_PODCASTS, JSON.stringify(null));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should set podcastData to an empty object if podcastId is not found in podcastsData", async () => {
    store.dispatch(
      setPodcasts({
        feed: {
          entry: [
            {
              id: { attributes: { "im:id": "5678" } },
              "im:name": "Podcast 1",
              "im:artist": { label: "Author 1" },
              "im:image": [{ label: "test" }, { label: "test" }, { label: "test" }],
              summary: { label: "description" }
            },
            {
              id: { attributes: { "im:id": "91011" } },
              "im:name": "Podcast 2",
              "im:artist": { label: "Author 2" },
              "im:image": [{ label: "test" }, { label: "test" }, { label: "test" }],
              summary: { label: "description" }
            }
          ]
        }
      })
    );

    render(
      <Provider store={store}>
        <HookWrapper hook={() => usePodcastData(podcastId)} />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });
});

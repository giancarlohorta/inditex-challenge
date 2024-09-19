import { render, screen, waitFor } from "@testing-library/react";
import useCache from "./useCache";
import { useLoading } from "../context/LoadingContext";
import { Provider } from "react-redux";
import { store } from "../store";
import { CACHE_TIME } from "../constants/constants";
import { resetStore } from "../utils/functions";

jest.mock("../context/LoadingContext", () => ({
  useLoading: jest.fn()
}));

interface HookWrapperProps {
  hook: () => object | null;
}

// Wrapper component to use the custom hook in tests
const HookWrapper = ({ hook }: HookWrapperProps) => {
  const data = hook();
  return <div data-testid="result">{JSON.stringify(data)}</div>;
};

describe("useCache", () => {
  const key = "testKey";
  const episodesKey = "123";
  const mockPodcastId = "1234";
  const mockPodcastData = { data: "podcastTest" };
  const mockEpisodesData = { data: "EpisodeTest" };
  const mockFetchFunction = jest.fn();
  let setIsLoading: jest.Mock;

  beforeEach(() => {
    setIsLoading = jest.fn();

    (useLoading as jest.Mock).mockReturnValue({ setIsLoading });
    // Clear localStorage and mock function calls before each test
    localStorage.clear();
    mockFetchFunction.mockClear();
    resetStore();
  });

  test("should fetch and store podecast data if no cache exists", async () => {
    mockFetchFunction.mockResolvedValue(mockPodcastData);

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl", "podcasts")} />
      </Provider>
    );
    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(mockPodcastData));
    });
    expect(mockFetchFunction).toHaveBeenCalledTimes(1);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(mockPodcastData));

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("should return cached podcasts data if it has not expired", async () => {
    localStorage.setItem(key, JSON.stringify(mockPodcastData));
    localStorage.setItem(`${key}_date`, new Date().toISOString());

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl", "podcasts")} />
      </Provider>
    );

    expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(mockPodcastData));

    expect(mockFetchFunction).not.toHaveBeenCalled();

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
  test("should fetch new podcasts data if the cache has expired", async () => {
    const expiredDate = new Date(Date.now() - CACHE_TIME - 1000).toISOString();

    localStorage.setItem(key, JSON.stringify(mockPodcastData));
    localStorage.setItem(`${key}_date`, expiredDate);

    const newMockData = { data: "newData" };
    mockFetchFunction.mockResolvedValue(newMockData);

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl", "podcasts")} />
      </Provider>
    );

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(newMockData));
      expect(mockFetchFunction).toHaveBeenCalledTimes(1);

      expect(localStorage.getItem(key)).toEqual(JSON.stringify(newMockData));

      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });

  test("should fetch and store episodes data if no cache exists", async () => {
    mockFetchFunction.mockResolvedValue(mockEpisodesData);

    render(
      <Provider store={store}>
        <HookWrapper
          hook={() =>
            useCache(episodesKey, mockFetchFunction, "testUrl", "episodes", mockPodcastId)
          }
        />
      </Provider>
    );

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(mockEpisodesData));
    });
    expect(mockFetchFunction).toHaveBeenCalledTimes(1);

    expect(localStorage.getItem(episodesKey)).toEqual(JSON.stringify(mockEpisodesData));

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
  test("should return cached episodes data if it has not expired", async () => {
    localStorage.setItem(episodesKey, JSON.stringify(mockEpisodesData));
    localStorage.setItem(`${episodesKey}_date`, new Date().toISOString());

    render(
      <Provider store={store}>
        <HookWrapper
          hook={() =>
            useCache(episodesKey, mockFetchFunction, "testUrl", "episodes", mockPodcastId)
          }
        />
      </Provider>
    );

    expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(mockEpisodesData));

    expect(mockFetchFunction).not.toHaveBeenCalled();

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("should fetch new episodes data if the cache has expired", async () => {
    const expiredDate = new Date(Date.now() - CACHE_TIME - 1000).toISOString();

    localStorage.setItem(episodesKey, JSON.stringify(mockEpisodesData));
    localStorage.setItem(`${episodesKey}_date`, expiredDate);

    const newMockData = { data: "newData" };
    mockFetchFunction.mockResolvedValue(newMockData);

    render(
      <Provider store={store}>
        <HookWrapper
          hook={() =>
            useCache(episodesKey, mockFetchFunction, "testUrl", "episodes", mockPodcastId)
          }
        />
      </Provider>
    );

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(newMockData));
      expect(mockFetchFunction).toHaveBeenCalledTimes(1);

      expect(localStorage.getItem(episodesKey)).toEqual(JSON.stringify(newMockData));

      expect(setIsLoading).toHaveBeenCalledWith(false);
    });
  });

  test("should handle fetch error", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    mockFetchFunction.mockRejectedValue(new Error("Fetch failed"));

    render(
      <Provider store={store}>
        <HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl", "podcasts")} />
      </Provider>
    );

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual("{}");
    });

    expect(setIsLoading).toHaveBeenCalledWith(false);
    expect(consoleSpy).toHaveBeenCalledWith("Failed to fetch data", expect.any(Error));
    consoleSpy.mockRestore();
  });
});

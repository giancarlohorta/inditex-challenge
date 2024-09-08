import { render, screen, waitFor } from "@testing-library/react";
import useCache from "./useCache";
import { useLoading } from "../context/LoadingContext";
import { CACHE_TIME } from "../constants/constants";

jest.mock("../context/LoadingContext", () => ({
  useLoading: jest.fn()
}));

const HookWrapper = ({ hook }) => {
  const data = hook();
  return <div data-testid="result">{JSON.stringify(data)}</div>;
};

describe("useCache", () => {
  const key = "testKey";
  const mockData = { data: "test" };
  const mockFetchFunction = jest.fn();
  let setIsLoading;

  beforeEach(() => {
    setIsLoading = jest.fn();
    useLoading.mockReturnValue({ setIsLoading });

    localStorage.clear();
    mockFetchFunction.mockClear();
  });

  test("should fetch and store data if no cache exists", async () => {
    mockFetchFunction.mockResolvedValue(mockData);

    render(<HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl")} />);

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(mockData));
    });
    expect(mockFetchFunction).toHaveBeenCalledTimes(1);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(mockData));

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("should return cached data if it has not expired", async () => {
    localStorage.setItem(key, JSON.stringify(mockData));
    localStorage.setItem(`${key}_date`, new Date().toISOString());

    render(<HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl")} />);

    expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(mockData));

    expect(mockFetchFunction).not.toHaveBeenCalled();

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("should fetch new data if the cache has expired", async () => {
    const expiredDate = new Date(Date.now() - CACHE_TIME - 1000).toISOString();

    localStorage.setItem(key, JSON.stringify(mockData));
    localStorage.setItem(`${key}_date`, expiredDate);

    const newMockData = { data: "newData" };
    mockFetchFunction.mockResolvedValue(newMockData);

    render(<HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl")} />);

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify(newMockData));
    });

    expect(mockFetchFunction).toHaveBeenCalledTimes(1);

    expect(localStorage.getItem(key)).toEqual(JSON.stringify(newMockData));

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });

  test("should handle fetch error", async () => {
    mockFetchFunction.mockRejectedValue(new Error("Fetch failed"));

    render(<HookWrapper hook={() => useCache(key, mockFetchFunction, "testUrl")} />);

    expect(setIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual("null");
    });

    expect(setIsLoading).toHaveBeenCalledWith(false);
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import useFetch from "./useFetch";
import { STATUS_FETCH } from "../constants/constants";
import { useEffect } from "react";

const mockAxios = new MockAdapter(axios);

const HookWrapper = ({ hook, url }) => {
  const { data, fetchStatus, request } = hook();
  useEffect(() => {
    request(url);
  }, []);
  return (
    <div>
      <div data-testid="status">{fetchStatus}</div>
      <div data-testid="result">{JSON.stringify(data)}</div>
    </div>
  );
};

describe("useFetch", () => {
  const mockUrl = "/test-url";
  const mockData = { data: "test data" };

  beforeEach(() => {
    mockAxios.reset();
  });

  test("should fetch and display data successfully", async () => {
    mockAxios.onGet(mockUrl).reply(200, mockData);

    render(
      <HookWrapper
        hook={() => useFetch((url) => axios.get(url))}
        url={mockUrl}
      />
    );

    expect(screen.getByTestId("status").textContent).toBe(STATUS_FETCH.LOADING);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockData)
      );
      expect(screen.getByTestId("status").textContent).toBe(STATUS_FETCH.DONE);
    });
  });

  test("should fetch and display data successfully with default fetch function", async () => {
    mockAxios.onGet(mockUrl).reply(200, mockData);

    render(<HookWrapper hook={() => useFetch()} url={mockUrl} />);

    expect(screen.getByTestId("status").textContent).toBe(STATUS_FETCH.LOADING);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockData)
      );
      expect(screen.getByTestId("status").textContent).toBe(STATUS_FETCH.DONE);
    });
  });

  test("should handle fetch error and display error status", async () => {
    mockAxios.onGet(mockUrl).reply(500);

    render(
      <HookWrapper
        hook={() => useFetch((url) => axios.get(url))}
        url={mockUrl}
      />
    );

    expect(screen.getByTestId("status").textContent).toBe(STATUS_FETCH.LOADING);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toBe("null");
      expect(screen.getByTestId("status").textContent).toBe(STATUS_FETCH.ERROR);
    });
  });
});

import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { mockPodcasts, mockUrlImage } from "../../mocks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useLoading } from "../../context/LoadingContext";

const mockAxios = new MockAdapter(axios);

jest.mock("../../context/LoadingContext", () => ({
  useLoading: jest.fn()
}));

describe("Home Page", () => {
  let setIsLoading;

  beforeEach(() => {
    mockAxios.reset();

    setIsLoading = jest.fn();
    (useLoading as jest.Mock).mockReturnValue({ setIsLoading });

    localStorage.clear();
  });

  test("should render podcasts and their details correctly", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    // Use `waitFor` to wait for the state updates
    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
      expect(screen.getByAltText("The Joe Budden Podcast")).toHaveAttribute("src", mockUrlImage);
      expect(screen.getByText("DISGRACELAND")).toBeInTheDocument();
      expect(screen.getByText(/Double Elvis Productions/)).toBeInTheDocument();
      const linkElement = screen.getByRole("link", {
        name: /Podcast DISGRACELAND by Double Elvis Productions/i
      });
      expect(linkElement).toBeInTheDocument();
      expect(linkElement).toHaveAttribute("href", "/podcast/1275172907");
    });
  });

  test("should filter podcasts based on user input", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const filterInput = await screen.findByPlaceholderText("Filter Podcasts...");
    expect(filterInput).toBeInTheDocument();

    act(() => {
      fireEvent.change(filterInput, { target: { value: "Budden" } });
    });

    // Use `waitFor` to wait for the filtered results
    await waitFor(() => {
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
      expect(screen.queryByText("DISGRACELAND")).not.toBeInTheDocument();
    });
  });

  test("should handle empty filter input", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    const filterInput = await screen.findByPlaceholderText("Filter Podcasts...");
    expect(filterInput).toBeInTheDocument();

    act(() => {
      fireEvent.change(filterInput, { target: { value: "" } });
    });

    // Use `waitFor` to wait for the updated results
    await waitFor(() => {
      expect(screen.getByText("5")).toBeInTheDocument();
      expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
      expect(screen.getByText("DISGRACELAND")).toBeInTheDocument();
    });
  });

  test("should show loading state", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  test("should show error state", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

    mockAxios.onGet(/toppodcasts/g).reply(500, null);

    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    expect(await screen.findByText("Error loading podcasts.")).toBeInTheDocument();
    consoleSpy.mockRestore();
  });

  test("should show message when there aren't podcasts", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(200, { feed: { entry: [] } });

    await act(async () => {
      render(
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      );
    });

    expect(await screen.findByText("No Podcasts found.")).toBeInTheDocument();
  });
});

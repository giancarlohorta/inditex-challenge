import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { mockPodcasts, mockUrlImage } from "../../mocks";
import useCache from "../../hooks/useCache";
import useFetch from "../../hooks/useFetch";
import { STATUS_FETCH } from "../../constants/constants";

jest.mock("../../hooks/useCache", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("../../hooks/useFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const request = jest.fn();

describe("Home Component", () => {
  beforeEach(() => {
    useCache.mockImplementation(() => mockPodcasts);
    useFetch.mockImplementation(() => {
      return {
        data: null,
        request: request,
      };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render podcasts and their details correctly", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const podcastCount = await screen.findByText("5");
    expect(podcastCount).toBeInTheDocument();

    const podcastName = "The Joe Budden Podcast";
    expect(screen.getByText(podcastName)).toBeInTheDocument();
    expect(screen.getByAltText(podcastName)).toHaveAttribute(
      "src",
      mockUrlImage
    );

    expect(screen.getByText("DISGRACELAND")).toBeInTheDocument();
    expect(screen.getByText(/Double Elvis Productions/)).toBeInTheDocument();

    const linkElement = screen.getByRole("link", {
      name: /Podcast DISGRACELAND by Double Elvis Productions/i,
    });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/podcast/1275172907");
  });

  test("should filter podcasts based on user input", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const filterInput =
      await screen.findByPlaceholderText("Filter Podcasts...");
    expect(filterInput).toBeInTheDocument();

    fireEvent.change(filterInput, { target: { value: "Budden" } });
    expect(await screen.findByText("1")).toBeInTheDocument();
    expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
    expect(screen.queryByText("DISGRACELAND")).not.toBeInTheDocument();
  });

  test("should handle empty filter input", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const filterInput =
      await screen.findByPlaceholderText("Filter Podcasts...");
    expect(filterInput).toBeInTheDocument();

    fireEvent.change(filterInput, { target: { value: "" } });
    expect(await screen.findByText("5")).toBeInTheDocument();
    expect(screen.getByText("The Joe Budden Podcast")).toBeInTheDocument();
    expect(screen.getByText("DISGRACELAND")).toBeInTheDocument();
  });

  test("should show loading state", async () => {
    useCache.mockImplementation(() => null);
    useFetch.mockImplementation(() => ({
      data: null,
      request: jest.fn(),
      fetchStatus: STATUS_FETCH.LOADING,
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should show error state", async () => {
    useCache.mockImplementation(() => null);
    useFetch.mockImplementation(() => ({
      data: null,
      request: jest.fn(),
      fetchStatus: STATUS_FETCH.ERROR,
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Error loading podcasts.")).toBeInTheDocument();
  });

  test("should show message when there aren't podcasts", async () => {
    useCache.mockImplementation(() => ({
      feed: {
        entry: [],
      },
    }));
    useFetch.mockImplementation(() => ({
      data: null,
      request: jest.fn(),
      fetchStatus: STATUS_FETCH.ERROR,
    }));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("No Podcasts found.")).toBeInTheDocument();
  });
});

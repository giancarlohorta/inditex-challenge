import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import { mockPodcasts, mockUrlImage } from "../../mocks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useLoading } from "../../context/LoadingContext";

const mockAxios = new MockAdapter(axios);

jest.mock("../../context/LoadingContext", () => ({
  useLoading: jest.fn(),
}));

describe("Home Page", () => {
  let setIsLoading;
  beforeEach(() => {
    mockAxios.reset();

    setIsLoading = jest.fn();
    useLoading.mockReturnValue({ setIsLoading });

    localStorage.clear();
  });

  test("should render podcasts and their details correctly", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);
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
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);
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
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);
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
    mockAxios.onGet(/toppodcasts/g).reply(200, mockPodcasts);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should show error state", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(500, null);

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Error loading podcasts.")
    ).toBeInTheDocument();
  });

  test("should show message when there aren't podcasts", async () => {
    mockAxios.onGet(/toppodcasts/g).reply(200, { feed: { entry: [] } });

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(await screen.findByText("No Podcasts found.")).toBeInTheDocument();
  });
});

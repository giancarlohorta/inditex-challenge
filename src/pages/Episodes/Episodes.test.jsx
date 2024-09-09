import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useParams } from "react-router-dom";
import Episodes from "./Episodes";
import { mockEpisodes } from "../../mocks";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useLoading } from "../../context/LoadingContext";

const mockAxios = new MockAdapter(axios);

jest.mock("../../context/LoadingContext", () => ({
  useLoading: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn()
}));

describe("Episodes Page", () => {
  let setIsLoading;

  beforeEach(() => {
    mockAxios.reset();
    setIsLoading = jest.fn();
    useLoading.mockReturnValue({ setIsLoading });
    localStorage.clear();
    jest.mocked(useParams).mockReturnValue({ podcastId: "12345" });
  });

  test("should render episodes and their details correctly", async () => {
    mockAxios.onGet(/lookup/g).reply(200, mockEpisodes);

    render(
      <MemoryRouter>
        <Episodes />
      </MemoryRouter>
    );

    const episodeCount = await screen.findByText(/Episodes: 12/i);
    expect(episodeCount).toBeInTheDocument();

    const episodeLink = await screen.findByRole("link", {
      name: /S2E1: Confusion/i
    });

    expect(episodeLink).toBeInTheDocument();
    expect(episodeLink).toHaveAttribute("href", "/podcast/12345/episode/1000668323398");

    const episodeDate = screen.getByText("04/09/2024");
    expect(episodeDate).toBeInTheDocument();

    const episodeDuration = screen.getByText("41:52");
    expect(episodeDuration).toBeInTheDocument();
    const episodeDurationWithHour = screen.getByText("1:00:18");
    expect(episodeDurationWithHour).toBeInTheDocument();
  });

  test("should not display the 'Duration' column if no episode has valid duration", async () => {
    const modifiedMockEpisodes = {
      ...mockEpisodes,
      results: mockEpisodes.results.map((episode) => ({
        ...episode,
        trackTimeMillis: undefined
      }))
    };

    mockAxios.onGet(/lookup/g).reply(200, modifiedMockEpisodes);

    render(
      <MemoryRouter>
        <Episodes />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.queryByText("Duration")).not.toBeInTheDocument());
  });

  test("should display message if there aren't episodes", async () => {
    const modifiedMockEpisodes = {
      ...mockEpisodes,
      results: []
    };

    mockAxios.onGet(/lookup/g).reply(200, modifiedMockEpisodes);

    render(
      <MemoryRouter>
        <Episodes />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText("No episodes available yet.")).toBeInTheDocument());
  });

  test("should show loading state while fetching data", () => {
    mockAxios.onGet(/lookup/g).reply(() => new Promise(() => {})); // Simulate pending request

    render(
      <MemoryRouter>
        <Episodes />
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading podcast details.../i)).toBeInTheDocument();
  });

  test("should display error message on fetch failure", async () => {
    mockAxios.onGet(/lookup/g).reply(500);

    render(
      <MemoryRouter>
        <Episodes />
      </MemoryRouter>
    );

    const errorMessage = await screen.findByText(/Failed to load podcast details/i);
    expect(errorMessage).toBeInTheDocument();
  });
});

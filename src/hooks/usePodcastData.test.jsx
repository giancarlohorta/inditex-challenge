import { render, screen, waitFor } from "@testing-library/react";
import usePodcastData from "./usePodcastData";
import { mockNormalizedPodcast, mockPodcasts } from "../mocks";
import { KEY_PODCASTS } from "../constants/constants";

const HookWrapper = ({ hook }) => {
  const data = hook();
  return <div data-testid="result">{JSON.stringify(data)}</div>;
};

describe("usePodcastData", () => {
  const podcastId = "1535809341";

  beforeEach(() => {
    // Clear localStorage before each test to avoid residual data
    localStorage.clear();
  });

  test("should fetch and normalize podcast data if it exists in localStorage", async () => {
    localStorage.setItem(KEY_PODCASTS, JSON.stringify(mockPodcasts));

    render(<HookWrapper hook={() => usePodcastData(podcastId)} />);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(
        JSON.stringify(mockNormalizedPodcast)
      );
    });
  });

  test("should return an empty object when localStorage has no data", async () => {
    render(<HookWrapper hook={() => usePodcastData(podcastId)} />);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should return an empty object if podcast is not found in the normalized data", async () => {
    // Set mock podcasts data in localStorage that does not include the podcastId
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

    render(<HookWrapper hook={() => usePodcastData(podcastId)} />);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
  });

  test("should handle JSON parsing errors", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    localStorage.setItem(KEY_PODCASTS, "{ invalid json ");

    render(<HookWrapper hook={() => usePodcastData(podcastId)} />);

    await waitFor(() => {
      expect(screen.getByTestId("result").textContent).toEqual(JSON.stringify({}));
    });
    consoleSpy.mockRestore();
  });
});

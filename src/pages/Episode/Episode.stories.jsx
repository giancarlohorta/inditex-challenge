import { mockEpisodes } from "../../mocks";
import Episode from "./Episode";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export default {
  title: "Pages/Episode",
  component: Episode,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "The Episode component displays a podcast episode's details, including title, description, and an audio player. It uses `useParams` from `react-router-dom` to fetch the `podcastId` and `episodeId`, and `useEpisodeData` to retrieve the episode data."
      }
    }
  }
};

const setupLocalStorage = (podcastId, episodeData) => {
  localStorage.clear();
  localStorage.setItem(`${podcastId}Data`, JSON.stringify(episodeData));
};

const renderWithRouter = (podcastId, episodeId) => (
  <MemoryRouter initialEntries={[`/podcast/${podcastId}/episode/${episodeId}`]}>
    <Routes>
      <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
    </Routes>
  </MemoryRouter>
);

const Template = (args) => {
  setupLocalStorage(args.podcastId, mockEpisodes);
  return renderWithRouter(args.podcastId, args.episodeId);
};

const TemplateWithoutDescription = (args) => {
  const mockWithoutDescription = {
    ...mockEpisodes.results.find(({ trackId }) => trackId === Number(args.episodeId)),
    description: ""
  };
  const mockEpisodesNoDescription = {
    resultCount: 13,
    results: [
      ...mockEpisodes.results.filter(({ trackId }) => trackId !== Number(args.episodeId)),
      { ...mockWithoutDescription }
    ]
  };

  setupLocalStorage(args.podcastId, mockEpisodesNoDescription);
  return renderWithRouter(args.podcastId, args.episodeId);
};

export const Default = Template.bind({});
Default.args = {
  podcastId: "1234",
  episodeId: "1000659456383"
};

export const NoDescription = TemplateWithoutDescription.bind({});
NoDescription.args = {
  podcastId: "1234",
  episodeId: "1000659456383"
};

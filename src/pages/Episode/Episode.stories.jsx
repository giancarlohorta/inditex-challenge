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

const Template = (args) => {
  localStorage.clear();
  localStorage.setItem(`${args.podcastId}Data`, JSON.stringify(mockEpisodes));
  return (
    <MemoryRouter initialEntries={[`/podcast/${args.podcastId}/episode/${args.episodeId}`]}>
      <Routes>
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
      </Routes>
    </MemoryRouter>
  );
};

const TemplateWithoutDescription = (args) => {
  localStorage.clear();
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

  localStorage.setItem(`${args.podcastId}Data`, JSON.stringify(mockEpisodesNoDescription));

  return (
    <MemoryRouter initialEntries={[`/podcast/${args.podcastId}/episode/${args.episodeId}`]}>
      <Routes>
        <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
      </Routes>
    </MemoryRouter>
  );
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

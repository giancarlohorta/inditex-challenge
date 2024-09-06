import axios from "axios";

export const defaultFetchFunction = async (url, options = {}) => {
    const response = await axios.get(url, options);
    return response;
  };


  export const normalizePodcastsData = (data) => {
    return data?.map((podcast) => {
      return {
        id: podcast.id.attributes["im:id"],
        author: podcast["im:artist"].label,
        image: podcast["im:image"][2].label,
        name: podcast["im:name"].label,
        description: podcast.summary.label,
      };
    });
  };

  export const normalizeEpisodesData = (data) => {
    return data?.map(
      ({
        trackId,
        trackName,
        trackTimeMillis,
        releaseDate,
        episodeUrl,
        description,
      }) => {
        return {
          id: trackId,
          name: trackName,
          duration: trackTimeMillis,
          releaseDate,
          episodeUrl,
          description,
        };
      }
    );
  };
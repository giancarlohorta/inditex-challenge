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

export const millisToHoursMinutesAndSeconds = (millis) => {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return hours > 0
    ? `${hours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
};

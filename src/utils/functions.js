import axios from "axios";
import { format } from "date-fns";
import { CACHE_TIME } from "../constants/constants";

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
      description: podcast.summary.label
    };
  });
};

export const normalizeEpisodesData = (data) => {
  return data?.map(
    ({ trackId, trackName, trackTimeMillis, releaseDate, episodeUrl, description }) => {
      return {
        id: trackId,
        name: trackName,
        duration: trackTimeMillis,
        releaseDate,
        episodeUrl,
        description
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

export const formatReleaseDate = (date) => format(date, "dd/MM/yyyy");

export const getStoredData = (key) => {
  const storedData = localStorage.getItem(key);
  const storedDate = localStorage.getItem(`${key}_date`);
  return { storedData, storedDate };
};

export const isCacheValid = (storedDate) => {
  const parsedDate = new Date(storedDate);
  const currentDate = new Date();
  const timeDifference = currentDate - parsedDate;
  return timeDifference < CACHE_TIME;
};

export const saveToCache = (key, data) => {
  if (data && key) {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_date`, new Date().toISOString());
  }
};

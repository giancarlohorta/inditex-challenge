import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { format } from "date-fns";
import { CACHE_TIME } from "../constants/constants";
import { NormalizedEpisode, NormalizedPodcast, RawEpisodeData, RawPodcastData } from "../types";
import { store } from "../store";
import { resetEpisodes } from "../features/episodeSlice";
import { resetPodcasts } from "../features/podecastSlice";

export const defaultFetchFunction = async (
  url: string,
  options: AxiosRequestConfig = {}
): Promise<AxiosResponse> => {
  const response = await axios.get(url, options);
  return response;
};

export const normalizePodcastsData = (data: RawPodcastData[]): NormalizedPodcast[] => {
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

export const normalizeEpisodesData = (data: RawEpisodeData[]): NormalizedEpisode[] => {
  return data?.map(
    ({ trackId, trackName, trackTimeMillis, releaseDate, episodeUrl, description }) => {
      return {
        id: trackId,
        name: trackName,
        duration: trackTimeMillis,
        releaseDate: releaseDate,
        episodeUrl: episodeUrl,
        description: description
      };
    }
  );
};

export const millisToHoursMinutesAndSeconds = (millis: number): string => {
  const hours = Math.floor(millis / 3600000);
  const minutes = Math.floor((millis % 3600000) / 60000);
  const seconds = Math.floor((millis % 60000) / 1000);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return hours > 0
    ? `${hours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`;
};

export const formatReleaseDate = (date: string): string => format(date, "dd/MM/yyyy");

export const getStoredData = (
  key: string
): { storedData: string | null; storedDate: string | null } => {
  const storedData = localStorage.getItem(key);
  const storedDate = localStorage.getItem(`${key}_date`);
  return { storedData, storedDate };
};

export const isCacheValid = (storedDate: string): boolean => {
  const parsedDate = new Date(storedDate);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - parsedDate.getTime();
  return timeDifference < CACHE_TIME;
};

export const saveToCache = (key: string, data: object): void => {
  if (data && key) {
    localStorage.setItem(key, JSON.stringify(data));
    localStorage.setItem(`${key}_date`, new Date().toISOString());
  }
};

export const resetStore = () => {
  store.dispatch(resetEpisodes());
  store.dispatch(resetPodcasts());
};

export const isNormalizedPodcast = (data: any): data is NormalizedPodcast => {
  return data && typeof data === "object" && "author" in data && "id" in data;
};

export const isNormalizedEpisode = (data: any): data is NormalizedEpisode => {
  return data && typeof data === "object" && "name" in data && "description" in data;
};

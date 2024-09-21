import { AxiosResponse } from "axios";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface RawPodcastData {
  id: {
    attributes: {
      "im:id": string;
    };
    [key: string]: any;
  };
  "im:artist": {
    label: string;
    [key: string]: any;
  };
  "im:image": {
    label: string;
    [key: string]: any;
  }[];
  "im:name": {
    label: string;
  };
  summary: {
    label: string;
  };
  [key: string]: any;
}

export interface NormalizedPodcast {
  id: string;
  author: string;
  image: string;
  name: string;
  description?: string;
}

export interface RawEpisodeData {
  trackId: number;
  trackName: string;
  trackTimeMillis?: number;
  releaseDate: string;
  episodeUrl?: string;
  description?: string;
  [key: string]: any;
}

export interface NormalizedEpisode {
  id: number;
  name: string;
  duration?: number | undefined;
  releaseDate: string;
  episodeUrl?: string | undefined;
  description?: string | undefined;
}

// context

export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export interface LoadingProviderProps {
  children: ReactNode;
}

//loader

export interface LoaderProps {
  loading: boolean;
}

// ItemList

export interface ListNormalizedPodcasts {
  list: NormalizedPodcast[];
}

// SearchInput

export interface SearchInputProps {
  podcastCount: number;
  keyword: string;
  onKeywordChange: (value: string) => void;
}

// useFetch

export interface FetchFunctionType {
  (url: string): Promise<AxiosResponse>;
}
export interface useFetchResponse {
  data: object;
  fetchStatus: string;
  request: FetchFunctionType;
}

// Home

export interface FeedData {
  entry: RawPodcastData[];
  [key: string]: any;
}

export interface PodcastData {
  feed: FeedData;
}

// Episodes

export interface EpisodesData {
  resultCount: 13;
  results: RawEpisodeData[];
}

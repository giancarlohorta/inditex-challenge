import { AxiosResponse } from "axios";
import { Dispatch, ReactNode, SetStateAction } from "react";

export interface RawPodcastData {
  id: {
    attributes: {
      "im:id": string;
    };
  };
  "im:artist": {
    label: string;
  };
  "im:image": {
    label: string;
  }[];
  "im:name": {
    label: string;
  };
  summary: {
    label: string;
  };
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
  trackTimeMillis: number;
  releaseDate: string;
  episodeUrl?: string;
  description?: string;
}

export interface NormalizedEpisode {
  id: number;
  name: string;
  duration?: number;
  releaseDate: string;
  episodeUrl: string | undefined;
  description: string | undefined;
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

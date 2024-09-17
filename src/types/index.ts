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

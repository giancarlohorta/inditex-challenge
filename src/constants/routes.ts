export const ROUTES = {
  home: "/",
  podcast: "/podcast/:podcastId/*"
} as const;

export const INTERNAL_ROUTES = {
  episodes: "/",
  episode: "episode/:episodeId"
} as const;

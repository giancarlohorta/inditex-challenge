export const PODCASTS_LIMIT: number = 100;

export const STATUS_FETCH = {
  INITIAL: "initial",
  LOADING: "loading",
  DONE: "done",
  ERROR: "error",
} as const;

export const KEY_PODCASTS: string = "podcastsData";

export const CACHE_TIME: number = 24 * 60 * 60 * 1000;

import { useEffect, useState } from "react";
import { normalizePodcastsData } from "../utils/functions";
import { KEY_PODCASTS } from "../constants/constants";
import { NormalizedPodcast } from "../types";

const usePodcastData = (podcastId: string): NormalizedPodcast | object => {
  const [podcastData, setPodcastData] = useState({});

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(KEY_PODCASTS);
      if (storedData) {
        const dataPodcasts = JSON.parse(storedData);

        if (dataPodcasts) {
          const normalizedPodcasts = normalizePodcastsData(dataPodcasts.feed.entry);

          const selectedPodcast = normalizedPodcasts.find((item) => item.id === podcastId);
          setPodcastData(selectedPodcast || {});
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error retrieving or processing podcast data from localStorage:", error);
      setPodcastData({});
    }
  }, [podcastId]);

  return podcastData;
};

export default usePodcastData;

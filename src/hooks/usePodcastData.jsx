import { useEffect, useState } from "react";
import { normalizePodcastsData } from "../utils/functions";
import { KEY_PODCASTS } from "../constants/constants";

const usePodcastData = (podcastId) => {
  const [podcastData, setPodcastData] = useState({});

  useEffect(() => {
    try {
      const dataPodcasts = JSON.parse(localStorage.getItem(KEY_PODCASTS));

      if (dataPodcasts) {
        const normalizedPodcasts = normalizePodcastsData(dataPodcasts.feed.entry);

        const selectedPodcast = normalizedPodcasts.find((item) => item.id === podcastId);
        setPodcastData(selectedPodcast || {});
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

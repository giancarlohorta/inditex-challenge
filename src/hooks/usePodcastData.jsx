import { useEffect, useState } from "react";
import { normalizePodcastsData } from "../utils/functions";
import { KEY_PODCASTS } from "../constants/constants";

const usePodcastData = (podcastId) => {
  const [podcastData, setPodcastData] = useState({});

  useEffect(() => {
    const dataPodcasts = JSON.parse(localStorage.getItem(KEY_PODCASTS));

    if (dataPodcasts) {
      const normalizedPodcasts = normalizePodcastsData(dataPodcasts.feed.entry);
      const selectedPodcast = normalizedPodcasts.find((item) => item.id === podcastId);
      setPodcastData(selectedPodcast || {});
    }
  }, [podcastId]);

  return podcastData;
};

export default usePodcastData;

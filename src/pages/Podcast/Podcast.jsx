import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import useCache from "../../hooks/useCache";
import { KEY_PODCASTS } from "../../constants/constants";
import {
  normalizeEpisodesData,
  normalizePodcastsData,
} from "../../utils/functions";

const Podcast = () => {
  const { podcastId } = useParams();
  const { request, fetchStatus } = useFetch();

  const [podcastData, setPodcastData] = useState({});

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`
  )}`;

  const fetchPodcasts = useCallback(() => request(url), [request, url]);

  const cachedData = useCache(`${podcastId}Data`, fetchPodcasts, fetchPodcasts);

  console.log(normalizeEpisodesData(cachedData?.results));
  useEffect(() => {
    const dataPodcasts = JSON.parse(localStorage.getItem(KEY_PODCASTS));
    if (dataPodcasts) {
      const normilizedDataPodcast = normalizePodcastsData(
        dataPodcasts.feed.entry
      );

      setPodcastData(
        normilizedDataPodcast.find((item) => {
          return item.id === podcastId;
        })
      );
    }
  }, []);
  return <div>Podcast</div>;
};

export default Podcast;

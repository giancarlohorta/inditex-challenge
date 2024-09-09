import { useEffect, useState } from "react";
import { normalizeEpisodesData } from "../utils/functions";

const useEpisodeData = (podcastId, episodeId) => {
  const [episodeData, setEpisodeData] = useState({});

  useEffect(() => {
    try {
      const dataEpisodes = JSON.parse(localStorage.getItem(`${podcastId}Data`));

      if (dataEpisodes) {
        const normalizedEpisodes = normalizeEpisodesData(dataEpisodes.results);

        const selectedEpisode = normalizedEpisodes.find(
          (episode) => episode.id === Number(episodeId)
        );

        setEpisodeData(selectedEpisode || {});
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error parsing episode data from localStorage", error);
      setEpisodeData({});
    }
  }, [podcastId, episodeId]);

  return episodeData;
};

export default useEpisodeData;

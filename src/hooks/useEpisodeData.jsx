import { useEffect, useState } from "react";
import { normalizeEpisodesData } from "../utils/functions";

const useEpisodeData = (podcastId, episodeId) => {
  const [episodeData, setEpisodeData] = useState({});

  useEffect(() => {
    const dataEpisodes = JSON.parse(localStorage.getItem(`${podcastId}Data`));
    if (dataEpisodes) {
      const normalizedEpisodes = normalizeEpisodesData(dataEpisodes.results);
      const selectedEpisode = normalizedEpisodes.find(
        (episode) => episode.id === Number(episodeId)
      );
      setEpisodeData(selectedEpisode || {});
    }
  }, [podcastId, episodeId]);

  return episodeData;
};

export default useEpisodeData;

import { useEffect, useState } from "react";
import { normalizeEpisodesData } from "../utils/functions";
import { NormalizedEpisode } from "../types";

const useEpisodeData = (podcastId: string, episodeId: string): NormalizedEpisode | {} => {
  const [episodeData, setEpisodeData] = useState<NormalizedEpisode | {}>({});

  useEffect(() => {
    try {
      const storedData = localStorage.getItem(`${podcastId}Data`);
      if (storedData) {
        const dataEpisodes = JSON.parse(storedData);

        if (dataEpisodes && dataEpisodes.results) {
          const normalizedEpisodes = normalizeEpisodesData(dataEpisodes.results);

          const selectedEpisode = normalizedEpisodes.find(
            (episode: NormalizedEpisode) => episode.id === Number(episodeId)
          );

          setEpisodeData(selectedEpisode || {});
        }
      }
    } catch (error) {
      console.error("Error parsing episode data from localStorage", error);
      setEpisodeData({});
    }
  }, [podcastId, episodeId]);

  return episodeData;
};

export default useEpisodeData;

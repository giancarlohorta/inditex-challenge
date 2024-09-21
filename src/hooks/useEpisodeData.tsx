import { useEffect, useState } from "react";
import { normalizeEpisodesData } from "../utils/functions";
import { EpisodesData, NormalizedEpisode } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setEpisodes } from "../features/episodeSlice";

const useEpisodeData = (podcastId: string, episodeId: string): NormalizedEpisode | {} => {
  const dispatch = useDispatch();
  const episodesData = useSelector((state: RootState) => state.episodes.list[podcastId]?.data);

  const [episodeData, setEpisodeData] = useState<NormalizedEpisode | {}>({});

  useEffect(() => {
    if (episodesData && (episodesData as EpisodesData).results.length > 0) {
      const normalizedEpisodes = normalizeEpisodesData((episodesData as EpisodesData).results);
      const selectedEpisode = normalizedEpisodes.find(
        (episode: NormalizedEpisode) => episode.id === Number(episodeId)
      );
      setEpisodeData(selectedEpisode || {});
    } else {
      try {
        const storedData = localStorage.getItem(`${podcastId}Data`);
        if (storedData) {
          const dataEpisodes = JSON.parse(storedData);

          if (dataEpisodes && dataEpisodes.results) {
            dispatch(setEpisodes({ podcastId, data: dataEpisodes }));
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
    }
  }, [podcastId, episodeId]);

  return episodeData;
};

export default useEpisodeData;

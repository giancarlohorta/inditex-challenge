import { Link, useParams } from "react-router-dom";
import {
  formatReleaseDate,
  millisToHoursMinutesAndSeconds,
  normalizeEpisodesData
} from "../../utils/functions";
import useFetch from "../../hooks/useFetch";
import { useCallback, useMemo } from "react";
import useCache from "../../hooks/useCache";
import { STATUS_FETCH } from "../../constants/constants";
import styles from "./Episodes.module.css";

const Episodes = () => {
  const { podcastId } = useParams();
  const { request, fetchStatus } = useFetch();

  const episodesUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`
  )}`;

  const fetchEpisodes = useCallback(() => request(episodesUrl), [request, episodesUrl]);

  const episodesData = useCache(`${podcastId}Data`, fetchEpisodes, fetchEpisodes);

  const normalizedEpisodesData = useMemo(() => {
    return episodesData && episodesData?.results?.length > 0
      ? normalizeEpisodesData(episodesData?.results)
      : [];
  }, [episodesData]);

  const shouldShowDurationColumn = (array) => {
    return array?.some(
      (item) =>
        Object.prototype.hasOwnProperty.call(item, "duration") && item.duration !== undefined
    );
  };

  const isEpisodesEmpty = normalizedEpisodesData?.length === 0;

  if (fetchStatus === STATUS_FETCH.LOADING) {
    return <div>Loading podcast details...</div>;
  }

  if (fetchStatus === STATUS_FETCH.ERROR) {
    return <div>Failed to load podcast details. Please try again later.</div>;
  }

  if (isEpisodesEmpty) {
    return <div>No episodes available yet.</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.counter}>
        <p className={styles["counter-text"]}>Episodes: {normalizedEpisodesData?.length}</p>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            {shouldShowDurationColumn(normalizedEpisodesData) && <th>Duration</th>}
          </tr>
        </thead>
        <tbody>
          {normalizedEpisodesData?.map(({ name, duration, releaseDate, id }) => {
            return (
              <tr key={id}>
                <th>
                  <Link to={`/podcast/${podcastId}/episode/${id}`}>{name}</Link>
                </th>
                <th>{formatReleaseDate(releaseDate)}</th>
                {duration && <th>{millisToHoursMinutesAndSeconds(duration)}</th>}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Episodes;

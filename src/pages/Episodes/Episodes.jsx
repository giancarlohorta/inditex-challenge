/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import { PropTypes } from "prop-types";
import styles from "./Episodes.module.css";
import {
  millisToHoursMinutesAndSeconds,
  normalizeEpisodesData,
} from "../../utils/functions";
import useFetch from "../../hooks/useFetch";
import { useCallback, useMemo } from "react";
import useCache from "../../hooks/useCache";
import { STATUS_FETCH } from "../../constants/constants";

const Episodes = () => {
  const { podcastId } = useParams();
  const { request, fetchStatus } = useFetch();

  const url = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`
  )}`;

  const fetchPodcasts = useCallback(() => request(url), [request, url]);

  const cachedData = useCache(`${podcastId}Data`, fetchPodcasts, fetchPodcasts);

  const normalizedEpisodesData = useMemo(() => {
    return normalizeEpisodesData(cachedData?.results)?.slice(1);
  }, [cachedData]);

  if (fetchStatus === STATUS_FETCH.LOADING) {
    return <div>Loading podcast details...</div>;
  }

  if (fetchStatus === STATUS_FETCH.ERROR) {
    return <div>Failed to load podcast details. Please try again later.</div>;
  }

  return (
    <div className={styles.content}>
      <div className={styles.counter}>
        <p className={styles["counter-text"]}>
          Episodes: {normalizedEpisodesData?.length}
        </p>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {normalizedEpisodesData?.map(
            ({ name, duration, releaseDate, id }) => (
              <tr key={id}>
                <th>
                  <Link to={`/podcast/${podcastId}/episode/${id}`}>{name}</Link>
                </th>
                <th>{new Date(releaseDate).toISOString().substring(0, 10)}</th>
                <th>{millisToHoursMinutesAndSeconds(duration)}</th>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
Episodes.propTypes = {
  dataEpisodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      duration: PropTypes.number,
      description: PropTypes.string,
      episodeUrl: PropTypes.string,
      releaseDate: PropTypes.string,
    })
  ),
  podcastId: PropTypes.string,
};

export default Episodes;

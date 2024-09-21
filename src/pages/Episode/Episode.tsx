import { useParams } from "react-router-dom";
import useEpisodeData from "../../hooks/useEpisodeData";
import styles from "./Episode.module.css";
import { NormalizedEpisode } from "../../types";
import { isNormalizedEpisode } from "../../utils/functions";

const Episode = () => {
  const { podcastId, episodeId } = useParams<{ podcastId: string; episodeId: string }>();

  if (!podcastId || !episodeId) {
    return <p>Invalid podcast or episode ID.</p>;
  }

  const episodeData: NormalizedEpisode | {} = useEpisodeData(podcastId, episodeId);

  if (!episodeData || !isNormalizedEpisode(episodeData)) {
    return <p>Loading episode data...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{episodeData.name}</h2>
        <p className={styles.description}>{episodeData.description || "No Description"}</p>
      </div>
      {episodeData.episodeUrl ? (
        <audio
          className={styles.audio}
          controls
          aria-label="Audio Player"
          role="region"
          src={episodeData.episodeUrl}
        />
      ) : (
        <p>Audio unavailable</p>
      )}
    </div>
  );
};

export default Episode;

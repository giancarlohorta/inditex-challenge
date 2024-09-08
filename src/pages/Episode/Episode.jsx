import { useParams } from "react-router";
import useEpisodeData from "../../hooks/useEpisodeData";
import styles from "./Episode.module.css";

const Episode = () => {
  const { podcastId, episodeId } = useParams();
  const episodeData = useEpisodeData(podcastId, episodeId);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{episodeData?.name}</h2>
        <p className={styles.description}>{episodeData?.description || "No Description"}</p>
      </div>
      <audio
        className={styles.audio}
        controls
        aria-label="Audio Player"
        role="region"
        src={episodeData?.episodeUrl}
      />
    </div>
  );
};

export default Episode;

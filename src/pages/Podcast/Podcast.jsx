import { Route, Routes, useParams } from "react-router";
import Item from "../../components/Item";
import usePodcastData from "../../hooks/usePodcastData";
import styles from "./Podcast.module.css";
import Episodes from "../Episodes";
import Episode from "../Episode";

const Podcast = () => {
  const { podcastId } = useParams();

  const podcastData = usePodcastData(podcastId);

  const hasPodcastData = Object.keys(podcastData).length === 0;

  if (hasPodcastData) {
    return <div>Podcast data not found.</div>;
  }

  return (
    <div className={styles.podcasts}>
      {podcastData && (
        <Item
          id={podcastData.id}
          author={podcastData.author}
          name={podcastData.name}
          image={podcastData.image}
          description={podcastData.description}
        />
      )}

      <Routes>
        <Route path="/" element={<Episodes />} />
        <Route path="episode/:episodeId" element={<Episode />} />
      </Routes>
    </div>
  );
};

export default Podcast;

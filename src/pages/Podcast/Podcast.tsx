import Item from "../../components/Item";
import usePodcastData from "../../hooks/usePodcastData";
import styles from "./Podcast.module.css";
import Episodes from "../Episodes";
import Episode from "../Episode";
import { Route, Routes, useParams } from "react-router-dom";
import { NormalizedPodcast } from "../../types";

const isNormalizedPodcast = (data: any): data is NormalizedPodcast => {
  return data && typeof data === "object" && "author" in data && "id" in data;
};

const Podcast = () => {
  const { podcastId } = useParams<{ podcastId: string }>();

  if (!podcastId) {
    return <div>Invalid podcast or episode ID.</div>;
  }

  const podcastData = usePodcastData(podcastId);

  if (!podcastData || !isNormalizedPodcast(podcastData)) {
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

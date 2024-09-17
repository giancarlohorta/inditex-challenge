import { useCallback, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { normalizePodcastsData } from "../../utils/functions";
import {
  KEY_PODCASTS,
  PODCASTS_LIMIT,
  STATUS_FETCH,
} from "../../constants/constants";
import SearchInput from "../../components/SearchInput";
import ItemList from "../../components/ItemList";
import useCache from "../../hooks/useCache";

const Home = () => {
  const { request, fetchStatus } = useFetch();

  const [keyword, setKeyword] = useState("");

  const url = `https://api.allorigins.win/raw?url=https://itunes.apple.com/us/rss/toppodcasts/limit=${PODCASTS_LIMIT}/genre=1310/json`;

  const fetchPodcasts = useCallback(() => request(url), [request, url]);

  const cachedData = useCache(KEY_PODCASTS, fetchPodcasts, fetchPodcasts);

  const normalizedData = useMemo(() => {
    return cachedData ? normalizePodcastsData(cachedData.feed.entry) : [];
  }, [cachedData]);

  const handleKeywordChange = (value) => {
    setKeyword(value);
  };

  const filteredPodcasts = useMemo(() => {
    if (!keyword) {
      return normalizedData;
    }
    return normalizedData.filter(
      (podcast) =>
        podcast.name.toLowerCase().includes(keyword.toLowerCase()) ||
        podcast.author.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, normalizedData]);

  const podcastCount = filteredPodcasts.length;

  if (fetchStatus === STATUS_FETCH.LOADING && !cachedData) {
    return <div>Loading...</div>;
  }

  if (fetchStatus === STATUS_FETCH.ERROR && !cachedData) {
    return <div>Error loading podcasts.</div>;
  }

  return (
    <div>
      <SearchInput
        onKeywordChange={handleKeywordChange}
        keyword={keyword}
        podcastCount={podcastCount}
      />
      <ItemList list={filteredPodcasts} />
    </div>
  );
};

export default Home;

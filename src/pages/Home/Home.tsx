import { useCallback, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { normalizePodcastsData } from "../../utils/functions";
import { KEY_PODCASTS, PODCASTS_LIMIT, STATUS_FETCH } from "../../constants/constants";
import SearchInput from "../../components/SearchInput";
import ItemList from "../../components/ItemList";
import useCache from "../../hooks/useCache";
import { CachedPodcastData } from "../../types";

const Home = () => {
  const { request, fetchStatus } = useFetch();

  const [keyword, setKeyword] = useState<string>("");

  const url = `https://api.allorigins.win/raw?url=https://itunes.apple.com/us/rss/toppodcasts/limit=${PODCASTS_LIMIT}/genre=1310/json`;

  const fetchPodcasts = useCallback(() => request(url), [request, url]);

  const cachedData = useCache(KEY_PODCASTS, fetchPodcasts, url);

  const normalizedData = useMemo(() => {
    if (cachedData && typeof cachedData === "object" && "feed" in cachedData) {
      const dataWithFeed = cachedData as CachedPodcastData;
      return normalizePodcastsData(dataWithFeed.feed.entry);
    }
    return [];
  }, [cachedData]);

  const handleKeywordChange = (value: string) => {
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

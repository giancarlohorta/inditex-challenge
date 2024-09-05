import { useEffect, useMemo, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { normalizePodcastsData } from "../../utils/functions";
import { PODCASTS_LIMIT, STATUS_FETCH } from "../../constants/constants";
import SearchInput from "../../components/SearchInput";
import Item from "../../components/Item";

const Home = () => {
  const { data, request, fetchStatus } = useFetch();

  const [normalizedData, setNormalizedData] = useState([]);
  const [keyword, setKeyword] = useState("");

  const url = `https://itunes.apple.com/us/rss/toppodcasts/limit=${PODCASTS_LIMIT}/genre=1310/json`;

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

  useEffect(() => {
    request(url);
  }, [url, request]);

  useEffect(() => {
    if (data) {
      const normalizedDataPodcasts = normalizePodcastsData(data.feed.entry);
      setNormalizedData(normalizedDataPodcasts);
    }
  }, [data]);

  if (fetchStatus === STATUS_FETCH.LOADING) {
    return <div>Loading...</div>;
  }

  if (fetchStatus === STATUS_FETCH.ERROR) {
    return <div>Erro ao carregar podcasts.</div>;
  }

  return (
    <div>
      <SearchInput
        onKeywordChange={handleKeywordChange}
        keyword={keyword}
        podcastCount={podcastCount}
      />
      {podcastCount === 0 ? (
        <div>Nenhum podcast encontrado.</div>
      ) : (
        filteredPodcasts.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            id={item.id}
            author={item.author}
            image={item.image}
          />
        ))
      )}
    </div>
  );
};

export default Home;

import { PropTypes } from "prop-types";
import styles from "./SearchInput.module.css";

const SearchInput = ({ onKeywordChange, podcastCount, keyword }) => {
  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        <p>{podcastCount}</p>
      </div>
      <input
        className={styles.input}
        placeholder="Filter Podcasts..."
        onChange={({ target }) => onKeywordChange(target.value)}
        value={keyword}
        data-testid="search"
      />
    </div>
  );
};

SearchInput.propTypes = {
  onKeywordChange: PropTypes.func.isRequired,
  podcastCount: PropTypes.number.isRequired,
  keyword: PropTypes.string.isRequired,
};
SearchInput.defaultProps = {
  onKeywordChange: () => {},
  podcastCount: 0,
  keyword: "",
};

export default SearchInput;

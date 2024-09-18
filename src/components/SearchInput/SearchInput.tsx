import { SearchInputProps } from "../../types";
import styles from "./SearchInput.module.css";

const SearchInput = ({ onKeywordChange, podcastCount, keyword }: SearchInputProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.counter}>
        <p>{podcastCount}</p>
      </div>
      <input
        className={styles.input}
        placeholder="Filter Podcasts..."
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onKeywordChange(event.target.value)
        }
        value={keyword}
      />
    </div>
  );
};

export default SearchInput;

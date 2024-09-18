import { Link } from "react-router-dom";
import styles from "./Item.module.css";
import { NormalizedPodcast } from "../../types";

const Item = ({ id, image, name, author, description }: NormalizedPodcast) => {
  return (
    <Link
      className={styles.container}
      to={`/podcast/${id}`}
      role="link"
      aria-label={`Podcast ${name} by ${author}`}
    >
      <img src={image} alt={name} />
      <h2 className={styles.title}>{name}</h2>
      <p className={styles.author}>Author: {author}</p>
      {description && (
        <div className={styles.description}>
          <p className={styles["description-title"]}>Descrition:</p>
          <p className={styles["description-text"]}>{description}</p>
        </div>
      )}
    </Link>
  );
};

export default Item;

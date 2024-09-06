import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";

const Item = ({ id, image, name, author, description }) => {
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
        <div>
          <p className={styles["description-title"]}>Descrition:</p>
          <p className={styles["description-text"]}>{description}</p>
        </div>
      )}
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Item;

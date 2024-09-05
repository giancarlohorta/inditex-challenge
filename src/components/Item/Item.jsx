import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Item.module.css";

const Item = ({ id, image, name, author }) => {
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
    </Link>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
Item.defaultProps = {
  id: "",
  image: "",
  name: "",
  author: "",
};

export default Item;

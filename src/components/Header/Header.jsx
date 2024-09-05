import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        Podcaster
      </Link>
      <Loader loading={true} />
    </div>
  );
};

Header.propTypes = {
  status: PropTypes.bool.isRequired,
};
Header.defaultProps = {
  status: false,
};

export default Header;

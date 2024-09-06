//import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import styles from "./Header.module.css";
import { useLoading } from "../../context/LoadingContext";

const Header = () => {
  const { isLoading } = useLoading();
  return (
    <div className={styles.header}>
      <Link to="/" className={styles.logo}>
        Podcaster
      </Link>
      <Loader loading={isLoading} />
    </div>
  );
};

//Header.propTypes = {
//status: PropTypes.bool.isRequired,
//};

export default Header;

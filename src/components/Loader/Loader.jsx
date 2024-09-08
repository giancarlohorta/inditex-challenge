import { PropTypes } from "prop-types";
import styles from "./Loader.module.css";

const Loader = ({ loading }) => {
  return loading && <div data-testid="loader" className={styles.loader}></div>;
};
Loader.propTypes = {
  loading: PropTypes.bool.isRequired
};
export default Loader;

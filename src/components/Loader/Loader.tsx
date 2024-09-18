import { LoaderProps } from "../../types";
import styles from "./Loader.module.css";

const Loader = ({ loading }: LoaderProps): JSX.Element | null => {
  if (!loading) {
    return null;
  }
  return <div data-testid="loader" className={styles.loader}></div>;
};

export default Loader;

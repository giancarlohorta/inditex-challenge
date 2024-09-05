import { lazy } from "react";
import styles from "./styles/global.module.css";
import Header from "./components/Header";

const Routes = lazy(() => import("./routes/Routes"));

const App = () => (
  <main className={styles.container}>
    <Header />
    <Routes />
  </main>
);

export default App;

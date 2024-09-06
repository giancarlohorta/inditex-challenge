import { lazy } from "react";
import styles from "./styles/global.module.css";
import Header from "./components/Header";
import { LoadingProvider } from "./context/LoadingContext";

const Routes = lazy(() => import("./routes/Routes"));

const App = () => (
  <LoadingProvider>
    <main className={styles.container}>
      <Header />
      <Routes />
    </main>
  </LoadingProvider>
);

export default App;

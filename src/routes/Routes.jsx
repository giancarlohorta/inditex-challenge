import { Suspense, lazy } from "react";
import { Route, Routes as RoutesApp } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const Home = lazy(() => import("../pages/Home"));
const Podcast = lazy(() => import("../pages/Podcast"));

const Routes = () => (
  <RoutesApp>
    <Route
      path={ROUTES.home}
      element={
        <Suspense fallback={<div>Looading...</div>}>
          <Home />
        </Suspense>
      }
    />

    <Route
      path={ROUTES.podcast}
      element={
        <Suspense fallback={<div>Looading...</div>}>
          <Podcast />
        </Suspense>
      }
    />
  </RoutesApp>
);

export default Routes;

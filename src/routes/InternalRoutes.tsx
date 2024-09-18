import { Suspense, lazy } from "react";
import { Route, Routes as RoutesApp } from "react-router-dom";
import { INTERNAL_ROUTES } from "../constants/routes";

const Episodes = lazy(() => import("../pages/Episodes"));
const Episode = lazy(() => import("../pages/Episode"));

const InternalRoutes = () => (
  <RoutesApp>
    <Route
      path={INTERNAL_ROUTES.episodes}
      element={
        <Suspense fallback={<div>Looading...</div>}>
          <Episodes />
        </Suspense>
      }
    />

    <Route
      path={INTERNAL_ROUTES.episode}
      element={
        <Suspense fallback={<div>Looading...</div>}>
          <Episode />
        </Suspense>
      }
    />
  </RoutesApp>
);

export default InternalRoutes;
